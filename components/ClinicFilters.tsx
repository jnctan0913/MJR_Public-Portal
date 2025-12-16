'use client'

import { useState } from 'react'
import { ClinicType, ClinicArea } from '@/types/clinic'

interface ClinicFiltersProps {
  onFilterChange: (filters: { clinicType: ClinicType | 'all'; area: ClinicArea | 'all' }) => void
}

export default function ClinicFilters({ onFilterChange }: ClinicFiltersProps) {
  const [selectedType, setSelectedType] = useState<ClinicType | 'all'>('all')
  const [selectedArea, setSelectedArea] = useState<ClinicArea | 'all'>('all')

  const handleTypeChange = (type: ClinicType | 'all') => {
    console.log('Type changed to:', type)
    setSelectedType(type)
    onFilterChange({ clinicType: type, area: selectedArea })
  }

  const handleAreaChange = (area: ClinicArea | 'all') => {
    console.log('Area changed to:', area)
    setSelectedArea(area)
    onFilterChange({ clinicType: selectedType, area })
  }

  const clinicTypes = [
    { value: 'all' as const, label: 'All', count: 0 },
    { value: 'clinic' as const, label: 'Physical Clinic', count: 0 },
    { value: 'telehealth' as const, label: 'Telehealth', count: 0 },
    { value: 'both' as const, label: 'Both', count: 0 },
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
        {/* Left: Clinic Type Filter - Pill Style */}
        <div className="flex flex-wrap items-center gap-2">
          {clinicTypes.map((type) => (
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
