import { groq } from 'next-sanity'

// Clinic Queries
export const clinicsQuery = groq`
  *[_type == "clinic"] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    featured,
    area,
    address,
    location,
    contact,
    hours,
    services,
    image,
    description,
    serviceProvider {
      type,
      logo,
      website,
      clinicPageUrl
    },
    doctors[] {
      name,
      photo,
      specialization,
      qualifications,
      bio,
      languagesSpoken,
      yearsOfExperience
    }
  }
`

export const featuredClinicsQuery = groq`
  *[_type == "clinic" && featured == true] | order(name asc) {
    _id,
    name,
    slug,
    featured,
    area,
    address,
    location,
    contact,
    hours,
    services,
    image,
    description,
    serviceProvider {
      type,
      logo,
      website,
      clinicPageUrl
    },
    doctors[] {
      name,
      photo,
      specialization,
      qualifications,
      bio,
      languagesSpoken,
      yearsOfExperience
    }
  }
`

export const clinicBySlugQuery = groq`
  *[_type == "clinic" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    featured,
    area,
    address,
    location,
    contact,
    hours,
    services,
    image,
    description,
    serviceProvider {
      type,
      logo,
      website,
      clinicPageUrl
    },
    doctors[] {
      name,
      photo,
      specialization,
      qualifications,
      bio,
      languagesSpoken,
      yearsOfExperience
    }
  }
`
