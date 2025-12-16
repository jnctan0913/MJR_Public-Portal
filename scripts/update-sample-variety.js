const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  token: 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D',
  useCdn: false,
});

async function updateClinicsWithVariety() {
  console.log('🔄 Updating clinics with variety in phone types...\n');

  try {
    const clinics = await client.fetch('*[_type == "clinic"]{ _id, name, slug }');
    
    const updates = [
      // HealthHub Medical Centre - Both WhatsApp and Phone
      {
        name: 'HealthHub Medical Centre',
        phoneNumbers: [
          { type: 'whatsapp', number: '+6562345678', label: 'WhatsApp' },
          { type: 'phone', number: '+6562345679', label: 'Main Line' },
        ],
      },
      // East Coast Family Clinic - Phone only
      {
        name: 'East Coast Family Clinic',
        phoneNumbers: [
          { type: 'phone', number: '+6564567890' },
        ],
      },
      // TeleHealth Plus - WhatsApp only
      {
        name: 'TeleHealth Plus',
        phoneNumbers: [
          { type: 'whatsapp', number: '+6531234567' },
        ],
      },
      // North Point Medical Group - Multiple phone types with labels
      {
        name: 'North Point Medical Group',
        phoneNumbers: [
          { type: 'phone', number: '+6567891234', label: 'Reception' },
          { type: 'whatsapp', number: '+6567891235', label: 'Appointments' },
          { type: 'phone', number: '+6567891236', label: 'After Hours' },
        ],
      },
    ];

    for (const update of updates) {
      const clinic = clinics.find(c => c.name === update.name);
      
      if (!clinic) {
        console.log(`⚠️  Could not find clinic: ${update.name}`);
        continue;
      }

      await client
        .patch(clinic._id)
        .set({
          'contact.phoneNumbers': update.phoneNumbers,
        })
        .commit();

      console.log(`✅ Updated ${update.name}`);
      console.log(`   - Phone entries: ${update.phoneNumbers.length}`);
      update.phoneNumbers.forEach((phone, idx) => {
        const label = phone.label ? ` (${phone.label})` : '';
        console.log(`     ${idx + 1}. ${phone.type === 'whatsapp' ? '📱 WhatsApp' : '☎️  Phone'}: ${phone.number}${label}`);
      });
    }

    console.log('\n✨ All clinics updated with variety!');
    console.log('\n📊 Summary:');
    console.log('   - HealthHub: Both WhatsApp + Phone');
    console.log('   - East Coast: Phone only');
    console.log('   - TeleHealth Plus: WhatsApp only');
    console.log('   - North Point: 3 entries with labels');

  } catch (error) {
    console.error('❌ Error updating clinics:', error.message);
    process.exit(1);
  }
}

updateClinicsWithVariety();


