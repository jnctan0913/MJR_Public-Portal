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

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
        {/* Clinic/Provider Image */}
        <div className="relative">
          {clinic.image && (
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={urlFor(clinic.image).width(600).height(400).url()}
                alt={clinic.image.alt || clinic.name}
                fill
                className={isTelehealthService ? "object-contain p-4" : "object-cover"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* CTA Button - Top Right Corner */}
              <a
                href={
                  isTelehealthService 
                    ? (clinic.serviceProvider?.website || '#') 
                    : (clinic.serviceProvider?.clinicPageUrl || '#')
                }
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 bg-dksh-red hover:bg-dksh-dark-red text-white px-4 py-2 rounded-full text-sm font-bold font-poppins transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 z-10"
              >
                <span>{isTelehealthService ? "Visit Page" : "View Details"}</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Clinic Info */}
        <div className="p-4 md:p-6">
          {/* Clinic Name */}
          <h3 className="text-xl md:text-2xl font-bold text-dksh-black font-poppins mb-3">
            {clinic.name}
          </h3>

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
          {!isTelehealthService && googleMapsUrl && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dksh-black mb-1 font-poppins">Address</h4>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm md:text-base text-dksh-gray hover:text-dksh-red transition-colors group cursor-pointer"
              >
                <svg 
                  className="w-5 h-5 flex-shrink-0 text-red-500 group-hover:text-dksh-red transition-colors mt-0.5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="flex-1">{address}</span>
              </a>
            </div>
          )}

          {/* Contact */}
          <div className="mb-4 space-y-2">
            <h4 className="text-sm font-semibold text-dksh-black mb-2 font-poppins">Contact</h4>
            
            {/* Phone Numbers - Support multiple with different types */}
            {clinic.contact.phoneNumbers && clinic.contact.phoneNumbers.map((phoneEntry, index) => {
              const cleanNumber = phoneEntry.number.replace(/[^0-9]/g, '')
              const isWhatsApp = phoneEntry.type === 'whatsapp'
              const href = isWhatsApp 
                ? `https://wa.me/${cleanNumber}`
                : `tel:${phoneEntry.number}`
              
              return (
                <a 
                  key={index}
                  href={href}
                  target={isWhatsApp ? "_blank" : undefined}
                  rel={isWhatsApp ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm md:text-base text-dksh-gray hover:text-dksh-red transition-colors group"
                >
                  {isWhatsApp ? (
                    // WhatsApp Icon
                    <svg 
                      className="w-5 h-5 flex-shrink-0 text-green-500 group-hover:text-dksh-red transition-colors" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ) : (
                    // Phone Icon
                    <svg 
                      className="w-5 h-5 flex-shrink-0 text-blue-500 group-hover:text-dksh-red transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  <span>
                    {phoneEntry.number}
                    {phoneEntry.label && <span className="text-xs text-gray-500 ml-1">({phoneEntry.label})</span>}
                  </span>
                </a>
              )
            })}

            {/* Email */}
            <a 
              href={`mailto:${clinic.contact.email}`}
              className="flex items-center gap-2 text-sm md:text-base text-dksh-gray hover:text-dksh-red transition-colors group"
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
          </div>

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
