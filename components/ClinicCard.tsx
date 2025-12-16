'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clinic } from '@/types/clinic'
import { formatAddress, getGoogleMapsUrl } from '@/lib/clinics'
import { urlFor } from '@/sanity/lib/client'
import DoctorModal from './DoctorModal'

interface ClinicCardProps {
  clinic: Clinic
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number | null>(null)
  const address = formatAddress(clinic.address)
  const googleMapsUrl = getGoogleMapsUrl(clinic)

  const isTelehealthService = clinic.serviceProvider?.type === 'telehealth_service'
  const hasProviderLogo = !!clinic.serviceProvider?.logo

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
        {/* Clinic Image with Provider Logo Overlay */}
        <div className="relative">
          {clinic.image && (
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={urlFor(clinic.image).width(600).height(400).url()}
                alt={clinic.image.alt || clinic.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Provider Logo Overlay */}
          {hasProviderLogo && (
            <div className="absolute top-3 left-3 bg-white rounded-lg shadow-md p-2">
              <div className="relative w-16 h-16">
                <Image
                  src={urlFor(clinic.serviceProvider!.logo!).width(100).height(100).url()}
                  alt={clinic.serviceProvider!.logo!.alt || 'Provider logo'}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Clinic Info */}
        <div className="p-4 md:p-6">
          {/* Name and Badges */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-dksh-black font-poppins">
              {clinic.name}
            </h3>
            <div className="flex flex-col gap-1 ml-2">
              {clinic.featured && (
                <span className="px-2 py-1 bg-dksh-yellow text-dksh-black text-xs font-semibold rounded-md whitespace-nowrap">
                  Featured
                </span>
              )}
              {clinic.serviceProvider?.type && (
                <span className={`px-2 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
                  clinic.serviceProvider.type === 'telehealth_service'
                    ? 'bg-dksh-pale-blue text-dksh-dark-blue'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {clinic.serviceProvider.type === 'telehealth_service'
                    ? 'Telehealth'
                    : 'Clinic'}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {clinic.description && (
            <p className="text-sm md:text-base text-dksh-gray mb-4 line-clamp-2">
              {clinic.description}
            </p>
          )}

          {/* Doctors Section - Only show if doctors exist */}
          {clinic.doctors && clinic.doctors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dksh-black mb-2 font-poppins">Doctors</h4>
              <div className="flex flex-wrap gap-2">
                {clinic.doctors.map((doctor, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDoctorIndex(index)}
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

          {/* Address - Only show for non-telehealth-only services */}
          {!isTelehealthService && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dksh-black mb-1 font-poppins">Address</h4>
              <p className="text-sm md:text-base text-dksh-gray">{address}</p>
            </div>
          )}

          {/* Contact */}
          <div className="mb-4 space-y-1">
            <h4 className="text-sm font-semibold text-dksh-black mb-1 font-poppins">Contact</h4>
            <p className="text-sm md:text-base text-dksh-gray">
              <span className="font-medium">Phone:</span>{' '}
              <a href={`tel:${clinic.contact.phone}`} className="hover:text-dksh-red transition-colors">
                {clinic.contact.phone}
              </a>
            </p>
            <p className="text-sm md:text-base text-dksh-gray">
              <span className="font-medium">Email:</span>{' '}
              <a href={`mailto:${clinic.contact.email}`} className="hover:text-dksh-red transition-colors">
                {clinic.contact.email}
              </a>
            </p>
          </div>

          {/* Services */}
          {clinic.services && clinic.services.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dksh-black mb-2 font-poppins">Services</h4>
              <div className="flex flex-wrap gap-2">
                {clinic.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-dksh-pale-blue text-dksh-dark-blue text-xs md:text-sm rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Operating Hours */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-dksh-black mb-2 font-poppins">Operating Hours</h4>
            <div className="space-y-1 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-dksh-gray">Mon - Fri:</span>
                <span className="text-dksh-black font-medium">{clinic.hours.monday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dksh-gray">Saturday:</span>
                <span className="text-dksh-black font-medium">{clinic.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dksh-gray">Sunday:</span>
                <span className="text-dksh-black font-medium">{clinic.hours.sunday}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Conditional based on service provider type */}
          {isTelehealthService ? (
            // Telehealth Service - Link to their website
            clinic.serviceProvider?.website && (
              <a
                href={clinic.serviceProvider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-dksh-red text-white text-center text-sm md:text-base font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300"
              >
                Visit Website
              </a>
            )
          ) : (
            // Physical Clinic - Show both clinic page and Google Maps links
            <div className="space-y-2">
              {clinic.serviceProvider?.clinicPageUrl && (
                <a
                  href={clinic.serviceProvider.clinicPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-dksh-dark-blue text-white text-center text-sm md:text-base font-semibold font-poppins rounded-button hover:bg-opacity-90 transition-colors duration-300"
                >
                  View Clinic Page
                </a>
              )}
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-dksh-red text-white text-center text-sm md:text-base font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300"
                >
                  View on Google Maps
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Modal */}
      {selectedDoctorIndex !== null && clinic.doctors && clinic.doctors[selectedDoctorIndex] && (
        <DoctorModal
          doctor={clinic.doctors[selectedDoctorIndex]}
          isOpen={selectedDoctorIndex !== null}
          onClose={() => setSelectedDoctorIndex(null)}
        />
      )}
    </>
  )
}
