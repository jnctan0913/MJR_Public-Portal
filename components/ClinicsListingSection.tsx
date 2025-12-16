'use client'

import { useState, useMemo } from 'react'
import { Clinic, ServiceProviderType, ClinicArea } from '@/types/clinic'
import ClinicCard from './ClinicCard'
import ClinicFilters from './ClinicFilters'

interface ClinicsListingSectionProps {
  clinics: Clinic[]
  heading?: string
  description?: string
}

export default function ClinicsListingSection({
  clinics,
  heading = 'Find a Doctor Near You',
  description,
}: ClinicsListingSectionProps) {
  const [filters, setFilters] = useState<{
    providerType: ServiceProviderType | 'all'
    area: ClinicArea | 'all'
  }>({
    providerType: 'all',
    area: 'all',
  })

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      // Filter by provider type
      if (filters.providerType !== 'all') {
        // Skip clinics without serviceProvider data
        if (!clinic.serviceProvider || !clinic.serviceProvider.type) {
          return false;
        }
        
        if (clinic.serviceProvider.type !== filters.providerType) {
          return false;
        }
      }

      // Filter by area (skip if clinic is telehealth-only)
      if (filters.area !== 'all') {
        // Telehealth-only services don't have an area, so always show them
        if (clinic.serviceProvider?.type === 'telehealth_service') {
          return true;
        }
        
        // For physical clinics, check area
        if (clinic.area !== filters.area) {
          return false;
        }
      }

      return true;
    })
  }, [clinics, filters])

  if (!clinics || clinics.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-dksh-off-white">
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
    <section className="py-12 md:py-16 lg:py-20 bg-dksh-off-white">
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
        <ClinicFilters onFilterChange={setFilters} />

        {/* Results Count */}
        <div className="mb-6 text-center md:text-left">
          <p className="text-sm md:text-base text-dksh-gray">
            Showing <span className="font-semibold text-dksh-black">{filteredClinics.length}</span>{' '}
            {filteredClinics.length === 1 ? 'clinic' : 'clinics'}
          </p>
        </div>

        {/* Clinics Grid */}
        {filteredClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredClinics.map((clinic) => (
              <ClinicCard key={clinic._id} clinic={clinic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-dksh-gray mb-2">No clinics match your selected filters.</p>
            <p className="text-sm text-dksh-gray">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
