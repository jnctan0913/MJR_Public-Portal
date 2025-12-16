const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  token: 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D',
  useCdn: false,
});

async function verifyAndFixClinics() {
  console.log('🔍 Verifying clinic data...\n');

  try {
    const clinics = await client.fetch('*[_type == "clinic"]{ _id, name, serviceProvider, area }');
    
    console.log(`Found ${clinics.length} clinics\n`);

    let issuesFound = 0;
    const fixes = [];

    for (const clinic of clinics) {
      const issues = [];
      
      // Check if serviceProvider exists
      if (!clinic.serviceProvider) {
        issues.push('Missing serviceProvider field');
        fixes.push({
          _id: clinic._id,
          name: clinic.name,
          fix: {
            serviceProvider: {
              type: 'clinic', // Default to clinic
              website: '',
              clinicPageUrl: ''
            }
          }
        });
      } else if (!clinic.serviceProvider.type) {
        issues.push('Missing serviceProvider.type');
        fixes.push({
          _id: clinic._id,
          name: clinic.name,
          fix: {
            'serviceProvider.type': 'clinic' // Default to clinic
          }
        });
      }

      if (issues.length > 0) {
        issuesFound++;
        console.log(`⚠️  ${clinic.name}`);
        console.log(`   Issues: ${issues.join(', ')}`);
        console.log(`   Provider Type: ${clinic.serviceProvider?.type || 'MISSING'}`);
        console.log(`   Area: ${clinic.area || 'N/A'}`);
        console.log('');
      } else {
        console.log(`✅ ${clinic.name}`);
        console.log(`   Provider Type: ${clinic.serviceProvider.type}`);
        console.log(`   Area: ${clinic.area || 'N/A (Telehealth)'}`);
        console.log('');
      }
    }

    if (issuesFound === 0) {
      console.log('✨ All clinics have valid data! No fixes needed.\n');
    } else {
      console.log(`\n⚠️  Found ${issuesFound} clinic(s) with issues.\n`);
      console.log('Would you like to apply fixes? (Run with --fix flag)\n');
      
      if (process.argv.includes('--fix')) {
        console.log('🔧 Applying fixes...\n');
        
        for (const fix of fixes) {
          await client
            .patch(fix._id)
            .set(fix.fix)
            .commit();
          
          console.log(`✅ Fixed: ${fix.name}`);
        }
        
        console.log('\n✨ All issues fixed!\n');
      }
    }

  } catch (error) {
    console.error('❌ Error verifying clinics:', error.message);
    process.exit(1);
  }
}

verifyAndFixClinics();


