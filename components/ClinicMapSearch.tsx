'use client'

import { useState } from 'react'

interface ClinicMapSearchProps {
  onSearch: (location: { lat: number; lng: number }, searchTerm: string) => void
  onUseMyLocation: () => void
  isLoadingLocation?: boolean
}

export default function ClinicMapSearch({
  onSearch,
  onUseMyLocation,
  isLoadingLocation = false,
}: ClinicMapSearchProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isGeocoding, setIsGeocoding] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setIsGeocoding(true)

    try {
      // Use OneMap API for Singapore postal codes (free, no API key required)
      // Format: 6 digits for Singapore postal codes
      const isPostalCode = /^\d{6}$/.test(searchInput.trim())

      if (isPostalCode) {
        // Search by postal code using OneMap
        const response = await fetch(
          `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${searchInput.trim()}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
        )
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const result = data.results[0]
          const location = {
            lat: parseFloat(result.LATITUDE),
            lng: parseFloat(result.LONGITUDE),
          }
          onSearch(location, searchInput.trim())
        } else {
          alert('Postal code not found. Please try another postal code.')
        }
      } else {
        // For non-postal code searches, try OneMap search
        const response = await fetch(
          `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
            searchInput.trim()
          )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
        )
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const result = data.results[0]
          const location = {
            lat: parseFloat(result.LATITUDE),
            lng: parseFloat(result.LONGITUDE),
          }
          onSearch(location, searchInput.trim())
        } else {
          alert('Location not found. Please try a different search term or postal code.')
        }
      }
    } catch (error) {
      console.error('Error geocoding:', error)
      alert('Failed to search location. Please try again.')
    } finally {
      setIsGeocoding(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
      <h3 className="text-lg font-semibold text-dksh-black mb-4 font-poppins">
        Find Clinics Near You
      </h3>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter postal code (e.g., 238882) or address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-dksh-black text-base font-poppins focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isGeocoding || !searchInput.trim()}
            className="px-6 py-3 bg-dksh-red text-white font-semibold rounded-button hover:bg-dksh-dark-red transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap font-poppins"
          >
            {isGeocoding ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-dksh-gray">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={isLoadingLocation}
          className="w-full px-4 py-3 bg-white border-2 border-dksh-red text-dksh-red font-semibold rounded-button hover:bg-dksh-red hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-poppins"
        >
          {isLoadingLocation ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Getting location...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Use My Current Location
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-dksh-gray mt-4 text-center">
        Enter a Singapore postal code or address to find nearby clinics
      </p>
    </div>
  )
}
