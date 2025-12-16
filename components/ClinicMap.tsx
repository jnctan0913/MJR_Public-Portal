'use client'

import { useState, useCallback, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Clinic } from '@/types/clinic'
import { formatAddress, formatPhoneNumber } from '@/lib/clinics'

interface ClinicMapProps {
  clinics: Clinic[]
  center?: { lat: number; lng: number }
  zoom?: number
  onMarkerClick?: (clinic: Clinic) => void
  highlightedClinicId?: string | null
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
}

// Default center: Singapore
const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198,
}

export default function ClinicMap({
  clinics,
  center = defaultCenter,
  zoom = 12,
  onMarkerClick,
  highlightedClinicId,
}: ClinicMapProps) {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  })

  // Filter out telehealth services (they don't have physical locations)
  const physicalClinics = useMemo(
    () => clinics.filter((clinic) => clinic.serviceProvider?.type !== 'telehealth_service'),
    [clinics]
  )

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (clinic: Clinic) => {
    setSelectedClinic(clinic)
    if (onMarkerClick) {
      onMarkerClick(clinic)
    }
  }

  // Custom marker icon for highlighted clinic - only create when map is loaded
  const getMarkerIcon = useCallback((clinicId: string) => {
    if (!isLoaded || typeof google === 'undefined') {
      return undefined
    }

    if (highlightedClinicId === clinicId) {
      return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
            <path fill="#E31E24" d="M16 0C7.164 0 0 7.164 0 16c0 12 16 24 16 24s16-12 16-24c0-8.836-7.164-16-16-16zm0 22c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
            <circle fill="#FFF" cx="16" cy="16" r="4"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(32, 40),
      }
    }
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
          <path fill="#DC143C" d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 21 14 21s14-10.5 14-21c0-7.732-6.268-14-14-14zm0 19c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/>
          <circle fill="#FFF" cx="14" cy="14" r="3"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(28, 36),
    }
  }, [isLoaded, highlightedClinicId])

  // Get animation - only when map is loaded
  const getAnimation = useCallback((clinicId: string) => {
    if (!isLoaded || typeof google === 'undefined') {
      return undefined
    }
    return highlightedClinicId === clinicId ? google.maps.Animation.BOUNCE : undefined
  }, [isLoaded, highlightedClinicId])

  if (loadError) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <svg
            className="mx-auto mb-4 w-16 h-16 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Error Loading Map</h3>
          <p className="text-sm text-gray-500">
            Unable to load Google Maps. Please check your API key and try again.
          </p>
        </div>
      </div>
    )
  }

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <svg
            className="mx-auto mb-4 w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Google Maps API Key Required</h3>
          <p className="text-sm text-gray-500">
            Please add your Google Maps API key to the .env.local file
          </p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dksh-red mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">Loading Map...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {physicalClinics.map((clinic) => (
            <Marker
              key={clinic._id}
              position={{ lat: clinic.location.lat, lng: clinic.location.lng }}
              onClick={() => handleMarkerClick(clinic)}
              icon={getMarkerIcon(clinic._id)}
              animation={getAnimation(clinic._id)}
            />
          ))}

          {selectedClinic && (
            <InfoWindow
              position={{
                lat: selectedClinic.location.lat,
                lng: selectedClinic.location.lng,
              }}
              onCloseClick={() => setSelectedClinic(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-base text-dksh-black mb-2 font-poppins">
                  {selectedClinic.name}
                </h3>
                <p className="text-sm text-dksh-gray mb-2">
                  {formatAddress(selectedClinic.address)}
                </p>
                {selectedClinic.contact.phoneNumbers && selectedClinic.contact.phoneNumbers[0] && (
                  <p className="text-sm text-dksh-gray mb-2">
                    <strong>Phone:</strong>{' '}
                    {formatPhoneNumber(selectedClinic.contact.phoneNumbers[0].number)}
                  </p>
                )}
                {selectedClinic.contact.email && (
                  <p className="text-sm text-dksh-gray mb-3">
                    <strong>Email:</strong> {selectedClinic.contact.email}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedClinic.location.lat},${selectedClinic.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1.5 bg-dksh-red text-white text-sm font-semibold rounded-button hover:bg-dksh-dark-red transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
    </div>
  )
}
