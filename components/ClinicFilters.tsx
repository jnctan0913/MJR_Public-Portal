'use client'

import { useState } from 'react'
import { ServiceProviderType, ClinicArea } from '@/types/clinic'

interface ClinicFiltersProps {
  onFilterChange: (filters: { 
    providerType: ServiceProviderType | 'all'; 
    area: ClinicArea | 'all';
    location?: string;
  }) => void
}

export default function ClinicFilters({ onFilterChange }: ClinicFiltersProps) {
  const [selectedType, setSelectedType] = useState<ServiceProviderType | 'all'>('all')
  const [selectedArea, setSelectedArea] = useState<ClinicArea | 'all'>('all')
  const [locationInput, setLocationInput] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleTypeChange = (type: ServiceProviderType | 'all') => {
    setSelectedType(type)
    onFilterChange({ providerType: type, area: selectedArea })
  }

  const handleAreaChange = (area: ClinicArea | 'all') => {
    setSelectedArea(area)
    onFilterChange({ providerType: selectedType, area })
  }

  const handleLocationSearch = () => {
    if (locationInput.trim()) {
      onFilterChange({ 
        providerType: selectedType, 
        area: selectedArea,
        location: locationInput.trim()
      })
    }
  }

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoadingLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onFilterChange({ 
            providerType: selectedType, 
            area: selectedArea,
            location: `${latitude},${longitude}`
          })
          setLocationInput('Using current location')
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please enter a postal code or address.')
          setIsLoadingLocation(false)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  const providerTypes = [
    { value: 'all' as const, label: 'All' },
    { value: 'clinic' as const, label: 'Clinics' },
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
    <div className="mb-8 space-y-6">
      {/* Location Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        {/* Postal Code / Address Input */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
            placeholder="Enter postal code (e.g., 238882) or address"
            className="flex-1 px-4 py-3 text-base font-poppins text-dksh-black bg-white border-2 border-gray-300 rounded-lg focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none transition-all"
          />
          <button
            onClick={handleLocationSearch}
            className="px-8 py-3 bg-dksh-red hover:bg-dksh-dark-red text-white font-semibold font-poppins rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Divider with "or" */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or</span>
          </div>
        </div>

        {/* Use Current Location Button */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className="w-full px-6 py-3 bg-white hover:bg-gray-50 text-dksh-red font-semibold font-poppins rounded-lg border-2 border-dksh-red transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {isLoadingLocation ? 'Getting location...' : 'Use My Current Location'}
        </button>

        <p className="mt-3 text-sm text-center text-gray-500 font-poppins">
          Enter a Singapore postal code or address to find nearby clinics
        </p>
      </div>

      {/* Existing Filters */}
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
          <label htmlFor="area-select" className="text-sm text-dksh-black font-medium font-poppins whitespace-nowrap">
            Area:
          </label>
          <select
            id="area-select"
            value={selectedArea}
            onChange={(e) => handleAreaChange(e.target.value as ClinicArea | 'all')}
            className="px-4 py-2 text-sm font-medium font-poppins text-dksh-black bg-white border border-gray-200 rounded-lg focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:ring-offset-0 hover:border-dksh-red hover:ring-2 hover:ring-dksh-red/20 hover:ring-offset-0 focus:outline-none transition-all cursor-pointer shadow-sm"
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
