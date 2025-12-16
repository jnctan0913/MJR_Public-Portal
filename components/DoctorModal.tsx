'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Doctor } from '@/types/clinic'
import { urlFor } from '@/sanity/lib/client'

interface DoctorModalProps {
  doctor: Doctor
  isOpen: boolean
  onClose: () => void
}

export default function DoctorModal({ doctor, isOpen, onClose }: DoctorModalProps) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {/* Doctor Photo and Name */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {doctor.photo && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={urlFor(doctor.photo).width(300).height(300).url()}
                  alt={doctor.photo.alt || doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            )}

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-dksh-black font-poppins mb-2">
                {doctor.name}
              </h2>

              {doctor.specialization && (
                <p className="text-lg text-dksh-red font-medium mb-3">{doctor.specialization}</p>
              )}

              {doctor.qualifications && doctor.qualifications.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  {doctor.qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dksh-pale-blue text-dksh-dark-blue text-sm font-medium rounded-full"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              )}

              {doctor.yearsOfExperience !== undefined && doctor.yearsOfExperience > 0 && (
                <p className="text-sm text-dksh-gray">
                  <span className="font-semibold">{doctor.yearsOfExperience}</span>{' '}
                  {doctor.yearsOfExperience === 1 ? 'year' : 'years'} of experience
                </p>
              )}
            </div>
          </div>

          {/* Biography */}
          {doctor.bio && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dksh-black font-poppins mb-3">
                About
              </h3>
              <p className="text-base text-dksh-gray leading-relaxed whitespace-pre-wrap">
                {doctor.bio}
              </p>
            </div>
          )}

          {/* Languages Spoken */}
          {doctor.languagesSpoken && doctor.languagesSpoken.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dksh-black font-poppins mb-3">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languagesSpoken.map((language, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-dksh-black text-sm font-medium rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Close Button at Bottom */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-dksh-red text-white font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
