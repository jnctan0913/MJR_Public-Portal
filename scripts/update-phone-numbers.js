const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  token: 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D',
  useCdn: false,
});

async function updatePhoneNumbers() {
  console.log('🔄 Updating clinic phone numbers to new format...\n');

  try {
    // Fetch all clinics
    const clinics = await client.fetch('*[_type == "clinic"]{ _id, name, contact }');
    
    console.log(`Found ${clinics.length} clinics to update\n`);

    for (const clinic of clinics) {
      // Check if already in new format
      if (clinic.contact.phoneNumbers) {
        console.log(`⏭️  Skipping ${clinic.name} - already updated`);
        continue;
      }

      // Convert old format to new format
      const phoneNumbers = [];
      
      if (clinic.contact.phone) {
        // Add as WhatsApp by default (can be changed in Sanity Studio later)
        phoneNumbers.push({
          _type: 'object',
          type: 'whatsapp',
          number: clinic.contact.phone,
        });
      }

      // Update the clinic
      await client
        .patch(clinic._id)
        .set({
          'contact.phoneNumbers': phoneNumbers,
        })
        .unset(['contact.phone', 'contact.fax']) // Remove old fields
        .commit();

      console.log(`✅ Updated ${clinic.name}`);
      console.log(`   - Converted phone: ${clinic.contact.phone} → WhatsApp`);
    }

    console.log('\n✨ All clinics updated successfully!');
    console.log('\n📝 Note: You can now edit each clinic in Sanity Studio to:');
    console.log('   - Change phone type (WhatsApp ↔ Phone Call)');
    console.log('   - Add multiple phone numbers');
    console.log('   - Add optional labels');

  } catch (error) {
    console.error('❌ Error updating clinics:', error.message);
    process.exit(1);
  }
}

updatePhoneNumbers();


