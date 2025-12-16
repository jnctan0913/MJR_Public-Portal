const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'wtjg9zxv',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D'
})

async function checkClinicURLs() {
  try {
    console.log('🔍 Checking clinic URLs...\n')
    
    const clinics = await client.fetch(`
      *[_type == "clinic"] {
        _id,
        name,
        serviceProvider {
          type,
          website,
          clinicPageUrl
        }
      }
    `)
    
    clinics.forEach(clinic => {
      console.log(`📍 ${clinic.name}`)
      console.log(`   Type: ${clinic.serviceProvider?.type || 'NOT SET'}`)
      console.log(`   Website: ${clinic.serviceProvider?.website || 'NOT SET'}`)
      console.log(`   Clinic Page URL: ${clinic.serviceProvider?.clinicPageUrl || 'NOT SET'}`)
      
      const isTelehealth = clinic.serviceProvider?.type === 'telehealth_service'
      const hasURL = isTelehealth 
        ? clinic.serviceProvider?.website 
        : clinic.serviceProvider?.clinicPageUrl
        
      console.log(`   ✓ Button will show: ${hasURL ? 'YES' : 'NO'}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkClinicURLs()


