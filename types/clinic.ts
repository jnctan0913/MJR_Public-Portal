export interface ClinicAddress {
  street: string
  unit?: string
  city: string
  postalCode: string
  country: string
}

export type PhoneContactType = 'whatsapp' | 'phone'

export interface PhoneNumber {
  type: PhoneContactType
  number: string
  label?: string
}

export interface ClinicContact {
  phoneNumbers: PhoneNumber[]
  email: string
}

export interface ClinicLocation {
  lat: number
  lng: number
  alt?: number
}

export type ClinicArea = 'central' | 'north' | 'south' | 'east' | 'west' | 'north-east'
export type ServiceProviderType = 'clinic' | 'telehealth_service'

export interface SanityImage {
  asset: {
    _ref: string
  }
  alt?: string
}

export interface ServiceProvider {
  type: ServiceProviderType
  website?: string
  clinicPageUrl?: string
}

export interface Doctor {
  name: string
  photo?: SanityImage
  specialization?: string
  qualifications?: string[]
  bio?: string
  languagesSpoken?: string[]
  yearsOfExperience?: number
}

export interface Clinic {
  _id: string
  name: string
  slug: {
    current: string
  }
  area?: ClinicArea
  address: ClinicAddress
  contact: ClinicContact
  location: ClinicLocation
  featured: boolean
  image?: SanityImage
  serviceProvider?: ServiceProvider
  doctors?: Doctor[]
}

export interface ClinicsData {
  clinics: Clinic[]
  lastUpdated: string
}
