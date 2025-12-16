const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  token: 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D',
  useCdn: false,
});

async function fixTelehealthTypes() {
  console.log('🔧 Fixing telehealth service types...\n');

  try {
    const clinics = await client.fetch('*[_type == "clinic" && name match "*TeleHealth*"]{ _id, name, serviceProvider }');
    
    for (const clinic of clinics) {
      if (clinic.serviceProvider?.type !== 'telehealth_service') {
        await client
          .patch(clinic._id)
          .set({
            'serviceProvider.type': 'telehealth_service'
          })
          .commit();
        
        console.log(`✅ Updated: ${clinic.name}`);
        console.log(`   Changed from: ${clinic.serviceProvider?.type || 'clinic'} → telehealth_service\n`);
      } else {
        console.log(`✓ Already correct: ${clinic.name}\n`);
      }
    }

    console.log('✨ All telehealth services updated!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixTelehealthTypes();

