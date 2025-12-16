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
    contact {
      phoneNumbers[] {
        type,
        number,
        label
      },
      email
    },
    hours,
    image,
    description,
    serviceProvider {
      type,
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
    contact {
      phoneNumbers[] {
        type,
        number,
        label
      },
      email
    },
    hours,
    image,
    description,
    serviceProvider {
      type,
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
    contact {
      phoneNumbers[] {
        type,
        number,
        label
      },
      email
    },
    hours,
    image,
    description,
    serviceProvider {
      type,
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
