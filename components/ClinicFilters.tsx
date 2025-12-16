'use client'

import { useState } from 'react'
import { ServiceProviderType, ClinicArea } from '@/types/clinic'

interface ClinicFiltersProps {
  onFilterChange: (filters: { providerType: ServiceProviderType | 'all'; area: ClinicArea | 'all' }) => void
}

export default function ClinicFilters({ onFilterChange }: ClinicFiltersProps) {
  const [selectedType, setSelectedType] = useState<ServiceProviderType | 'all'>('all')
  const [selectedArea, setSelectedArea] = useState<ClinicArea | 'all'>('all')

  const handleTypeChange = (type: ServiceProviderType | 'all') => {
    console.log('Provider type changed to:', type)
    setSelectedType(type)
    onFilterChange({ providerType: type, area: selectedArea })
  }

  const handleAreaChange = (area: ClinicArea | 'all') => {
    console.log('Area changed to:', area)
    setSelectedArea(area)
    onFilterChange({ providerType: selectedType, area })
  }

  const providerTypes = [
    { value: 'all' as const, label: 'All' },
    { value: 'clinic' as const, label: 'Physical Clinic' },
    { value: 'telehealth_service' as const, label: 'Telehealth' },
  ]

  const areas = [
    { value: 'all' as const, label: 'All Areas' },
    { value: 'central' as const, label: 'Central' },
    { value: 'north' as const, label: 'North' },
    { value: 'south' as const, label: 'South' },
    { value: 'east' as const, label: 'East' },
    { value: 'west' as const, label: 'West' },
    { value: 'north-east' as const, label: 'North-East' },
  ]

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Provider Type Filter - Pill Style */}
        <div className="flex flex-wrap items-center gap-2">
          {providerTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleTypeChange(type.value)}
              className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium font-poppins transition-all duration-200 cursor-pointer ${
                selectedType === type.value
                  ? 'bg-dksh-pale-blue text-dksh-dark-blue border-2 border-dksh-dark-blue'
                  : 'bg-white text-dksh-gray border-2 border-gray-300 hover:border-dksh-pale-blue hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Right: Area Filter - Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="area-select" className="text-sm text-dksh-gray font-medium font-poppins whitespace-nowrap">
            Area:
          </label>
          <select
            id="area-select"
            value={selectedArea}
            onChange={(e) => handleAreaChange(e.target.value as ClinicArea | 'all')}
            className="px-4 py-2 text-sm font-medium font-poppins text-dksh-gray bg-white border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-dksh-red focus:border-dksh-red transition-all duration-200 cursor-pointer hover:border-dksh-red outline-none"
          >
            {areas.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
