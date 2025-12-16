const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function debugClinicData() {
  try {
    console.log('🔍 Fetching clinic data from Sanity...\n')
    
    const clinics = await client.fetch(`
      *[_type == "clinic"] | order(name asc) {
        _id,
        name,
        image {
          asset {
            _ref
          },
          alt
        },
        doctors[] {
          name,
          photo {
            asset {
              _ref
            },
            alt
          }
        }
      }
    `)
    
    console.log(`Found ${clinics.length} clinics\n`)
    
    clinics.forEach((clinic, index) => {
      console.log(`\n${index + 1}. ${clinic.name}`)
      console.log(`   Clinic Image: ${clinic.image ? '✅ YES' : '❌ NO'}`)
      if (clinic.image) {
        console.log(`   - Asset ref: ${clinic.image.asset?._ref || 'MISSING'}`)
        console.log(`   - Alt text: ${clinic.image.alt || 'NOT SET'}`)
      }
      
      console.log(`   Doctors: ${clinic.doctors?.length || 0}`)
      if (clinic.doctors && clinic.doctors.length > 0) {
        clinic.doctors.forEach((doctor, dIndex) => {
          console.log(`   ${dIndex + 1}. ${doctor.name}`)
          console.log(`      Photo: ${doctor.photo ? '✅ YES' : '❌ NO'}`)
          if (doctor.photo) {
            console.log(`      - Asset ref: ${doctor.photo.asset?._ref || 'MISSING'}`)
            console.log(`      - Alt text: ${doctor.photo.alt || 'NOT SET'}`)
          }
        })
      }
    })
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

debugClinicData()

