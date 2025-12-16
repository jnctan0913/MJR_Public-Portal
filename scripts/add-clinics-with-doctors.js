const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1x3s3r3w',
  dataset: 'production',
  apiVersion: '2024-12-16',
  token: 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D',
  useCdn: false,
});

const sampleClinics = [
  {
    _type: 'clinic',
    name: 'HealthHub Medical Centre',
    slug: {
      _type: 'slug',
      current: 'healthhub-medical-centre',
    },
    featured: true,
    serviceProvider: {
      type: 'clinic',
      website: 'https://healthhub.com.sg',
      clinicPageUrl: 'https://healthhub.com.sg/obesity-clinic',
    },
    area: 'central',
    address: {
      street: '290 Orchard Road',
      unit: '#09-01 Paragon Medical Centre',
      city: 'Singapore',
      postalCode: '238859',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.3036,
      lng: 103.8354,
    },
    contact: {
      phone: '+6562345678',
      email: 'info@healthhub.com.sg',
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed',
    },
    description: 'Leading obesity management clinic in Singapore with experienced specialists and personalized treatment plans.',
    doctors: [
      {
        name: 'Dr. Sarah Tan',
        specialization: 'Obesity Medicine',
        qualifications: ['MBBS (Singapore)', 'MRCP (UK)', 'FAMS (Endocrinology)'],
        bio: 'Dr. Sarah Tan is a board-certified endocrinologist with over 15 years of experience in obesity management. She specializes in comprehensive weight loss programs combining medical therapy, lifestyle modifications, and behavioral counseling.',
        languagesSpoken: ['English', 'Mandarin', 'Malay'],
        yearsOfExperience: 15,
      },
      {
        name: 'Dr. Kumar Raj',
        specialization: 'Internal Medicine & Obesity',
        qualifications: ['MBBS (NUS)', 'MMed (Internal Medicine)', 'Dip. Obesity Management'],
        bio: 'Dr. Kumar has dedicated his career to helping patients achieve sustainable weight loss through evidence-based medical interventions and lifestyle coaching.',
        languagesSpoken: ['English', 'Tamil', 'Hindi'],
        yearsOfExperience: 12,
      },
    ],
  },
  {
    _type: 'clinic',
    name: 'East Coast Family Clinic',
    slug: {
      _type: 'slug',
      current: 'east-coast-family-clinic',
    },
    featured: false,
    serviceProvider: {
      type: 'clinic',
      website: 'https://eastcoastfamilyclinic.sg',
      clinicPageUrl: 'https://eastcoastfamilyclinic.sg/weight-management',
    },
    area: 'east',
    address: {
      street: '112 East Coast Road',
      unit: '#01-05',
      city: 'Singapore',
      postalCode: '428802',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.3055,
      lng: 103.9053,
    },
    contact: {
      phone: '+6564567890',
      email: 'contact@eastcoastfc.sg',
    },
    hours: {
      monday: '8:30 AM - 7:00 PM',
      tuesday: '8:30 AM - 7:00 PM',
      wednesday: '8:30 AM - 7:00 PM',
      thursday: '8:30 AM - 7:00 PM',
      friday: '8:30 AM - 7:00 PM',
      saturday: '8:30 AM - 2:00 PM',
      sunday: 'Closed',
    },
    description: 'Friendly neighborhood clinic providing comprehensive weight management services for the whole family.',
    doctors: [
      {
        name: 'Dr. Michelle Wong',
        specialization: 'Family Medicine',
        qualifications: ['MBBS (Singapore)', 'GDFM', 'Cert. Obesity Medicine'],
        bio: 'Dr. Michelle Wong brings a holistic approach to weight management, focusing on family wellness and sustainable lifestyle changes.',
        languagesSpoken: ['English', 'Mandarin', 'Cantonese'],
        yearsOfExperience: 8,
      },
    ],
  },
  {
    _type: 'clinic',
    name: 'TeleHealth Plus',
    slug: {
      _type: 'slug',
      current: 'telehealth-plus',
    },
    featured: true,
    serviceProvider: {
      type: 'telehealth_service',
      website: 'https://telehealthplus.sg',
    },
    address: {
      street: 'Virtual Consultation',
      city: 'Singapore',
      postalCode: '000000',
      country: 'Singapore',
    },
    contact: {
      phone: '+6531234567',
      email: 'support@telehealthplus.sg',
    },
    hours: {
      monday: '24/7 Available',
      tuesday: '24/7 Available',
      wednesday: '24/7 Available',
      thursday: '24/7 Available',
      friday: '24/7 Available',
      saturday: '24/7 Available',
      sunday: '24/7 Available',
    },
    description: 'Singapore\'s leading telehealth platform offering convenient online consultations for weight management with experienced doctors.',
    doctors: [
      {
        name: 'Dr. James Lim',
        specialization: 'Telehealth & Obesity Medicine',
        qualifications: ['MBBS (NUS)', 'MPH', 'Cert. Digital Health'],
        bio: 'Dr. James Lim is a pioneer in digital health delivery, bringing obesity medicine expertise directly to patients through secure online consultations.',
        languagesSpoken: ['English', 'Mandarin'],
        yearsOfExperience: 10,
      },
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Nutrition & Weight Management',
        qualifications: ['MBBS', 'MSc Nutrition', 'FAMS'],
        bio: 'Dr. Priya combines medical expertise with nutritional science to create personalized weight loss plans for her telehealth patients.',
        languagesSpoken: ['English', 'Hindi', 'Tamil'],
        yearsOfExperience: 9,
      },
    ],
  },
  {
    _type: 'clinic',
    name: 'North Point Medical Group',
    slug: {
      _type: 'slug',
      current: 'north-point-medical-group',
    },
    featured: false,
    serviceProvider: {
      type: 'clinic',
      website: 'https://northpointmedical.com.sg',
      clinicPageUrl: 'https://northpointmedical.com.sg/specialists',
    },
    area: 'north',
    address: {
      street: '930 Yishun Avenue 2',
      unit: '#02-20 North Point City',
      city: 'Singapore',
      postalCode: '769098',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.4294,
      lng: 103.8356,
    },
    contact: {
      phone: '+6567891234',
      email: 'appointments@northpointmed.sg',
    },
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '9:00 AM - 1:00 PM',
    },
    description: 'Multi-specialty medical group with dedicated obesity and metabolic health specialists serving the northern region.',
    doctors: [
      {
        name: 'Dr. Alex Chen',
        specialization: 'Endocrinology & Metabolic Disorders',
        qualifications: ['MBBS', 'MRCP (UK)', 'FAMS (Endocrinology)', 'PhD (Metabolic Health)'],
        bio: 'Dr. Alex Chen is a leading expert in metabolic health and obesity management, with extensive research experience in weight loss interventions.',
        languagesSpoken: ['English', 'Mandarin', 'Hokkien'],
        yearsOfExperience: 18,
      },
      {
        name: 'Dr. Emily Goh',
        specialization: 'Bariatric Medicine',
        qualifications: ['MBBS (Singapore)', 'MRCGP', 'Dip. Bariatric Medicine'],
        bio: 'Dr. Emily specializes in medical weight management and pre/post-bariatric surgery care, helping patients achieve long-term success.',
        languagesSpoken: ['English', 'Mandarin', 'Malay'],
        yearsOfExperience: 11,
      },
      {
        name: 'Dr. Ravi Kumar',
        specialization: 'Sports Medicine & Weight Management',
        qualifications: ['MBBS', 'MMed (Sports Medicine)', 'FAMS'],
        bio: 'Dr. Ravi integrates sports medicine principles with weight management, focusing on exercise-based interventions and active lifestyle coaching.',
        languagesSpoken: ['English', 'Tamil', 'Hindi'],
        yearsOfExperience: 13,
      },
    ],
  },
];

async function uploadSampleClinics() {
  console.log('🚀 Starting to upload sample clinics with doctors...\n');

  try {
    for (const clinic of sampleClinics) {
      console.log(`📝 Adding: ${clinic.name}...`);
      
      const result = await client.create(clinic);
      
      console.log(`✅ Successfully added: ${clinic.name}`);
      console.log(`   - ID: ${result._id}`);
      console.log(`   - Type: ${clinic.serviceProvider.type}`);
      console.log(`   - Area: ${clinic.area || 'N/A (Telehealth)'}`);
      console.log(`   - Doctors: ${clinic.doctors?.length || 0}`);
      if (clinic.doctors) {
        clinic.doctors.forEach((doc, idx) => {
          console.log(`      ${idx + 1}. ${doc.name} - ${doc.specialization}`);
        });
      }
      console.log('');
    }

    console.log('✨ All sample clinics with doctors uploaded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Total Clinics: ${sampleClinics.length}`);
    console.log(`   Physical Clinics: ${sampleClinics.filter(c => c.serviceProvider.type === 'clinic').length}`);
    console.log(`   Telehealth Services: ${sampleClinics.filter(c => c.serviceProvider.type === 'telehealth_service').length}`);
    console.log(`   Total Doctors: ${sampleClinics.reduce((sum, c) => sum + (c.doctors?.length || 0), 0)}`);
    console.log('\n🌐 View them at: https://mjr-public-portal.sanity.studio/');

  } catch (error) {
    console.error('❌ Error uploading clinics:', error.message);
    process.exit(1);
  }
}

uploadSampleClinics();


