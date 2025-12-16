const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  useCdn: false,
});

async function testFetch() {
  try {
    console.log('🔍 Testing Sanity data fetch...\n');

    const clinics = await client.fetch('*[_type == "clinic"] | order(featured desc, name asc)');

    console.log(`✅ Found ${clinics.length} clinics:\n`);

    clinics.forEach((clinic, index) => {
      console.log(`${index + 1}. ${clinic.name}`);
      console.log(`   - Type: ${clinic.clinicType}`);
      console.log(`   - Area: ${clinic.area || 'N/A'}`);
      console.log(`   - Featured: ${clinic.featured ? 'Yes' : 'No'}`);
      console.log(`   - ID: ${clinic._id}\n`);
    });

    if (clinics.length === 0) {
      console.log('⚠️  No clinics found in Sanity. Please add clinics through the Studio.');
    }

  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
  }
}

testFetch();
