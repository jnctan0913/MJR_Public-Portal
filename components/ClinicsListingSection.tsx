'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Clinic, ServiceProviderType, ClinicArea } from '@/types/clinic'
import ClinicCard from './ClinicCard'
import ClinicFilters from './ClinicFilters'
import ClinicMap from './ClinicMap'
import DoctorModal from './DoctorModal'
import { findNearestClinics, formatDistance, formatPhoneNumber, formatAddress, getGoogleMapsUrl } from '@/lib/clinics'
import { urlFor } from '@/sanity/lib/client'

interface ClinicsListingSectionProps {
  clinics: Clinic[]
  heading?: string
  description?: string
}

type ViewMode = 'grid' | 'map'

export default function ClinicsListingSection({
  clinics,
  heading = 'Find a Doctor Near You',
  description,
}: ClinicsListingSectionProps) {
  const [filters, setFilters] = useState<{
    providerType: ServiceProviderType | 'all'
    area: ClinicArea | 'all'
    location?: string
  }>({
    providerType: 'all',
    area: 'all',
  })
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 1.3521,
    lng: 103.8198,
  })
  const [mapZoom, setMapZoom] = useState(12)
  const [highlightedClinicId, setHighlightedClinicId] = useState<string | null>(null)
  const [expandedClinicId, setExpandedClinicId] = useState<string | null>(null)
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<{ clinic: Clinic; doctorIndex: number } | null>(null)
  const [nearestClinics, setNearestClinics] = useState<Array<Clinic & { distance: number }> | null>(
    null
  )

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      // Filter by provider type
      if (filters.providerType !== 'all') {
        // Skip clinics without serviceProvider data
        if (!clinic.serviceProvider || !clinic.serviceProvider.type) {
            return false
        }

        if (clinic.serviceProvider.type !== filters.providerType) {
            return false
        }
      }

      // Filter by area (skip if clinic is telehealth-only)
      if (filters.area !== 'all') {
        // Telehealth-only services don't have an area, so always show them
        if (clinic.serviceProvider?.type === 'telehealth_service') {
          return true
        }

        // For physical clinics, check area
        if (clinic.area !== filters.area) {
          return false
        }
      }

      return true
    })
  }, [clinics, filters])

  const displayClinics = nearestClinics || filteredClinics

  const handleLocationFilter = async (locationString: string) => {
    try {
      // Check if it's already lat,lng coordinates
      if (locationString.includes(',')) {
        const [lat, lng] = locationString.split(',').map(Number)
        if (!isNaN(lat) && !isNaN(lng)) {
          // Find nearest clinics and stay in grid view
          const nearest = findNearestClinics(filteredClinics, lat, lng)
          setNearestClinics(nearest)
          setMapCenter({ lat, lng })
          return
        }
      }

      // Otherwise, treat as postal code or address and geocode
      // Singapore postal code format check
      const isPostalCode = /^\d{6}$/.test(locationString.trim())
      
      // Use Singapore Geocoding API (OneMap API)
      const searchQuery = isPostalCode 
        ? `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${locationString}&returnGeom=Y&getAddrDetails=Y`
        : `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(locationString)}&returnGeom=Y&getAddrDetails=Y`

      const response = await fetch(searchQuery)
      const data = await response.json()

      if (data.found > 0 && data.results && data.results.length > 0) {
        const result = data.results[0]
        const lat = parseFloat(result.LATITUDE)
        const lng = parseFloat(result.LONGITUDE)

        // Find nearest clinics and stay in grid view
        const nearest = findNearestClinics(filteredClinics, lat, lng)
        setNearestClinics(nearest)
        setMapCenter({ lat, lng })
      } else {
        alert('Location not found. Please enter a valid Singapore postal code or address.')
      }
    } catch (error) {
      console.error('Error geocoding location:', error)
      alert('Unable to find location. Please try again.')
    }
  }


  const handleMarkerClick = (clinic: Clinic) => {
    setHighlightedClinicId(clinic._id)
  }

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    if (mode === 'grid') {
      // Don't reset nearest clinics when switching back to grid view
      // so distance tags remain visible
      setHighlightedClinicId(null)
    } else if (mode === 'map' && nearestClinics && nearestClinics.length > 0) {
      // If switching to map view with location search active, highlight the nearest clinic
      setHighlightedClinicId(nearestClinics[0]._id)
      setMapZoom(15)
    }
  }

  if (!clinics || clinics.length === 0) {
    return (
      <section className="relative py-12 md:py-16 lg:py-20 bg-dksh-off-white z-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dksh-black font-poppins mb-4">
              {heading}
            </h2>
            <p className="text-lg text-dksh-gray">
              No clinics available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-dksh-off-white z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dksh-black font-poppins mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-dksh-gray max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Filters */}
        <ClinicFilters 
          onFilterChange={(newFilters) => {
            setFilters(newFilters)
            // If location is provided, trigger location-based search in grid view
            if (newFilters.location) {
              handleLocationFilter(newFilters.location)
            } else {
              // Clear location search results
              setNearestClinics(null)
            }
          }} 
        />

        {/* View Toggle and Results Count */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm md:text-base text-dksh-gray text-center md:text-left">
            Showing <span className="font-semibold text-dksh-black">{displayClinics.length}</span>{' '}
            {displayClinics.length === 1 ? 'clinic' : 'clinics'}
            {nearestClinics && (
              <span className="ml-2 text-dksh-red">(sorted by distance)</span>
            )}
          </p>

          <div className="flex gap-2 justify-center md:justify-end">
            <button
              onClick={() => handleViewModeChange('grid')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                viewMode === 'grid'
                  ? 'bg-dksh-red text-white'
                  : 'bg-white text-dksh-gray border border-gray-300 hover:border-dksh-red'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => handleViewModeChange('map')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                viewMode === 'map'
                  ? 'bg-dksh-red text-white'
                  : 'bg-white text-dksh-gray border border-gray-300 hover:border-dksh-red'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="hidden sm:inline">Map</span>
            </button>
          </div>
        </div>

        {/* Content: Grid or Map View */}
        {filteredClinics.length > 0 ? (
          viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {displayClinics.map((clinic) => {
                const clinicWithDistance = clinic as Clinic & { distance?: number }
                return (
                  <ClinicCard 
                    key={clinic._id} 
                    clinic={clinic} 
                    distance={clinicWithDistance.distance} 
                  />
                )
              })}
            </div>
          ) : (
            // Map View - Split Layout
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Grid: Map */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <ClinicMap
                  clinics={filteredClinics}
                  center={mapCenter}
                  zoom={mapZoom}
                  onMarkerClick={handleMarkerClick}
                  highlightedClinicId={highlightedClinicId}
                />
              </div>

              {/* Right Grid: Clinic List */}
              <div className="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">
                <h3 className="text-xl font-bold text-dksh-black mb-4 font-poppins flex-shrink-0">
                  {nearestClinics && nearestClinics.length > 0 ? 'Nearest Clinics' : 'All Clinics'}
                </h3>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                  {displayClinics.map((clinic, index) => {
                    const clinicWithDistance = clinic as Clinic & { distance?: number }
                    const isTelehealth = clinic.serviceProvider?.type === 'telehealth_service'
                    const isExpanded = expandedClinicId === clinic._id
                    const address = !isTelehealth && clinic.address ? formatAddress(clinic.address) : ''
                    const googleMapsUrl = !isTelehealth ? getGoogleMapsUrl(clinic) : ''
                    
                    return (
                      <div
                        key={clinic._id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 bg-white relative ${
                          highlightedClinicId === clinic._id
                            ? 'border-dksh-red'
                            : 'border-gray-200 hover:border-dksh-red'
                        }`}
                        onClick={() => {
                          // Toggle expansion
                          setExpandedClinicId(isExpanded ? null : clinic._id)
                          
                          // Highlight on map if not telehealth
                          if (!isTelehealth && clinic.location) {
                            setHighlightedClinicId(clinic._id)
                            setMapCenter({ lat: clinic.location.lat, lng: clinic.location.lng })
                            setMapZoom(16)
                          }
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Clinic Logo/Image */}
                          {clinic.image && (
                            <div className="flex-shrink-0">
                              <div className="relative w-16 h-16 md:w-20 md:h-20">
                                <Image
                                  src={urlFor(clinic.image).width(150).height(150).url()}
                                  alt={clinic.image.alt || clinic.name}
                                  fill
                                  className="object-contain drop-shadow-sm rounded-lg"
                                  sizes="80px"
                                />
                              </div>
                            </div>
                          )}

                          {/* Clinic Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h4 className="font-bold text-base text-dksh-black font-poppins">
                                {clinic.name}
                              </h4>
                              {isTelehealth && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                  Telehealth
                                </span>
                              )}
                              {/* CTA Link - Only show when expanded */}
                              {isExpanded && ((isTelehealth && clinic.serviceProvider?.website) ||
                                (!isTelehealth && clinic.serviceProvider?.clinicPageUrl)) && (
                                <a
                                  href={
                                    isTelehealth
                                      ? clinic.serviceProvider.website
                                      : clinic.serviceProvider.clinicPageUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="ml-auto text-xs bg-dksh-red hover:bg-dksh-dark-red text-white px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1"
                                >
                                  <span>Visit Page</span>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              )}
                            </div>
                            
                            {/* Collapsed View - Basic Info */}
                            {!isExpanded && (
                              <>
                                {!isTelehealth && clinic.address && (
                                  <p className="text-sm text-dksh-gray mb-1">
                                    {clinic.address.street}
                                    {clinic.address.unit && `, ${clinic.address.unit}`}
                                  </p>
                                )}
                                {clinic.contact.phoneNumbers && clinic.contact.phoneNumbers[0] && (
                                  <p className="text-sm text-dksh-gray">
                                    {formatPhoneNumber(clinic.contact.phoneNumbers[0].number)}
                                  </p>
                                )}
                              </>
                            )}

                            {/* Expanded View - Full Details */}
                            {isExpanded && (
                              <div className="space-y-3 mt-2">
                                {/* Doctors */}
                                {clinic.doctors && clinic.doctors.length > 0 && (
                                  <div>
                                    <h5 className="text-xs font-semibold text-dksh-black mb-1 font-poppins">Doctors</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {clinic.doctors.map((doctor, idx) => (
                                        <button
                                          key={idx}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedDoctorModal({ clinic, doctorIndex: idx })
                                          }}
                                          className="group relative"
                                          title={doctor.name}
                                        >
                                          {doctor.photo ? (
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-dksh-red transition-all duration-200 cursor-pointer">
                                              <Image
                                                src={urlFor(doctor.photo).width(100).height(100).url()}
                                                alt={doctor.photo.alt || doctor.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                              />
                                            </div>
                                          ) : (
                                            <div className="w-12 h-12 rounded-full bg-dksh-pale-blue flex items-center justify-center border-2 border-gray-200 hover:border-dksh-red transition-all duration-200 cursor-pointer">
                                              <span className="text-dksh-dark-blue font-semibold text-sm">
                                                {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                              </span>
                                            </div>
                                          )}
                                          {/* Tooltip on hover */}
                                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                            {doctor.name}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Address */}
                                {!isTelehealth && address && googleMapsUrl && (
                                  <div>
                                    <h5 className="text-xs font-semibold text-dksh-black mb-1 font-poppins">Address</h5>
                                    <a
                                      href={googleMapsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-start gap-2 text-sm text-dksh-gray hover:text-dksh-red transition-colors group"
                                    >
                                      <svg 
                                        className="w-5 h-5 flex-shrink-0 text-red-500 group-hover:text-dksh-red transition-colors mt-0.5" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                      </svg>
                                      <span className="flex-1">
                                        {address}
                                        {clinicWithDistance.distance !== undefined && (
                                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-dksh-red text-white">
                                            {formatDistance(clinicWithDistance.distance)}
                                          </span>
                                        )}
                                      </span>
                                    </a>
                                  </div>
                                )}

                                {/* Contact */}
                                <div>
                                  <h5 className="text-xs font-semibold text-dksh-black mb-1 font-poppins">Contact</h5>
                                  <div className="space-y-1">
                                    {clinic.contact.phoneNumbers && clinic.contact.phoneNumbers.map((phoneEntry, idx) => {
                                      const cleanNumber = phoneEntry.number.replace(/[^0-9]/g, '')
                                      const isWhatsApp = phoneEntry.type === 'whatsapp'
                                      const linkHref = isWhatsApp ? `https://wa.me/${cleanNumber}` : `tel:${cleanNumber}`
                                      const iconColor = isWhatsApp ? 'text-green-500' : 'text-blue-500'

                                      return (
                                        <a 
                                          key={idx}
                                          href={linkHref}
                                          target={isWhatsApp ? "_blank" : undefined}
                                          rel={isWhatsApp ? "noopener noreferrer" : undefined}
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex items-center gap-2 text-sm text-dksh-gray hover:text-dksh-red transition-colors group"
                                        >
                                          {isWhatsApp ? (
                                            <svg className={`w-5 h-5 flex-shrink-0 ${iconColor} group-hover:text-dksh-red transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                          ) : (
                                            <svg 
                                              className={`w-5 h-5 flex-shrink-0 ${iconColor} group-hover:text-dksh-red transition-colors`}
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                          )}
                                          <span>{phoneEntry.number} {phoneEntry.label && `(${phoneEntry.label})`}</span>
                                        </a>
                                      )
                                    })}

                                    {clinic.contact.email && (
                                      <a 
                                        href={`mailto:${clinic.contact.email}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-2 text-sm text-dksh-gray hover:text-dksh-red transition-colors group"
                                      >
                                        <svg 
                                          className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-dksh-red transition-colors" 
                                          fill="none" 
                                          stroke="currentColor" 
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{clinic.contact.email}</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Distance Badge - Only show in collapsed view */}
                          {!isExpanded && clinicWithDistance.distance !== undefined && (
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-dksh-red">
                                {formatDistance(clinicWithDistance.distance)}
                              </div>
                              <div className="text-xs text-dksh-gray">away</div>
                            </div>
                          )}
                        </div>

                        {/* Expand/Collapse Arrow Icon */}
                        <div className="absolute bottom-2 right-2">
                          <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-dksh-gray mb-2">No clinics match your selected filters.</p>
            <p className="text-sm text-dksh-gray">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Doctor Modal - Only show in map view */}
      {viewMode === 'map' && selectedDoctorModal && selectedDoctorModal.clinic.doctors && (
        <DoctorModal
          doctor={selectedDoctorModal.clinic.doctors[selectedDoctorModal.doctorIndex]}
          clinic={selectedDoctorModal.clinic}
          isOpen={true}
          onClose={() => setSelectedDoctorModal(null)}
        />
      )}
    </section>
  )
}
