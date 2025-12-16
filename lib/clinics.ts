import { Clinic } from '@/types/clinic'
import { client } from '@/sanity/lib/client'
import { clinicsQuery, featuredClinicsQuery, clinicBySlugQuery } from '@/sanity/lib/queries'

export async function getAllClinics(): Promise<Clinic[]> {
  return await client.fetch(clinicsQuery)
}

export async function getFeaturedClinics(): Promise<Clinic[]> {
  return await client.fetch(featuredClinicsQuery)
}

export async function getClinicBySlug(slug: string): Promise<Clinic | null> {
  return await client.fetch(clinicBySlugQuery, { slug })
}

export function getGoogleMapsUrl(clinic: Clinic): string {
  if (!clinic.location) {
    return ''
  }
  const { lat, lng } = clinic.location
  const address = formatAddress(clinic.address)
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(address)}`
}

export function formatAddress(address: Clinic['address']): string {
  const parts = [
    address.street,
    address.unit,
    address.city,
    address.postalCode,
    address.country
  ].filter(Boolean)

  return parts.join(', ')
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters first
  const cleaned = phoneNumber.replace(/\D/g, '')

  // Check if it's a Singapore number (starts with 65 or is 8 digits)
  if (cleaned.startsWith('65')) {
    // Format: +65 XXXX XXXX
    const countryCode = cleaned.slice(0, 2)
    const number = cleaned.slice(2)
    if (number.length === 8) {
      return `+${countryCode} ${number.slice(0, 4)} ${number.slice(4)}`
    }
  } else if (cleaned.length === 8) {
    // Format: XXXX XXXX (local Singapore number without country code)
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
  }

  // For other formats, try to format as groups of 4
  if (cleaned.length >= 8) {
    const formatted = cleaned.match(/.{1,4}/g)
    return formatted ? formatted.join(' ') : phoneNumber
  }

  // Return original if format is unrecognized
  return phoneNumber
}

export async function getClinicsByRegion(): Promise<Record<string, Clinic[]>> {
  const clinics = await getAllClinics()
  const regions: Record<string, Clinic[]> = {}

  clinics.forEach(clinic => {
    const region = clinic.address.city
    if (!regions[region]) {
      regions[region] = []
    }
    regions[region].push(clinic)
  })

  return regions
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Find the nearest clinics to a given location
 * Returns clinics sorted by distance with distance property added
 */
export function findNearestClinics(
  clinics: Clinic[],
  userLat: number,
  userLng: number,
  limit?: number
): Array<Clinic & { distance: number }> {
  // Filter out telehealth services
  const physicalClinics = clinics.filter(
    (clinic) => clinic.serviceProvider?.type !== 'telehealth_service'
  )

  // Calculate distances and add to clinic objects
  const clinicsWithDistance = physicalClinics.map((clinic) => ({
    ...clinic,
    distance: calculateDistance(userLat, userLng, clinic.location.lat, clinic.location.lng),
  }))

  // Sort by distance
  const sortedClinics = clinicsWithDistance.sort((a, b) => a.distance - b.distance)

  // Return limited results if specified
  return limit ? sortedClinics.slice(0, limit) : sortedClinics
}

/**
 * Format distance for display
 */
export function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)}m`
  }
  return `${distanceInKm.toFixed(1)}km`
}
