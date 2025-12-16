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
