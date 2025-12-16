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
    name: 'DKSH Healthcare Clinic - Orchard',
    slug: {
      _type: 'slug',
      current: 'dksh-healthcare-clinic-orchard',
    },
    clinicType: 'both',
    area: 'central',
    featured: true,
    address: {
      street: '391A Orchard Road',
      unit: '#05-01 Ngee Ann City Tower A',
      city: 'Singapore',
      postalCode: '238873',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.3027,
      lng: 103.8346,
    },
    contact: {
      phone: '+65 6734 5678',
      email: 'orchard@dkshhealthcare.com.sg',
      fax: '+65 6734 5679',
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
    services: [
      'Obesity Management',
      'Weight Loss Consultation',
      'Nutritional Counseling',
      'Metabolic Health Assessment',
      'Telehealth Consultations',
    ],
    description: 'Our flagship clinic in the heart of Orchard offers comprehensive obesity management services with both in-person and telehealth options.',
  },
  {
    _type: 'clinic',
    name: 'DKSH Medical Center - Raffles Place',
    slug: {
      _type: 'slug',
      current: 'dksh-medical-center-raffles-place',
    },
    clinicType: 'clinic',
    area: 'central',
    featured: true,
    address: {
      street: '6 Battery Road',
      unit: '#15-01',
      city: 'Singapore',
      postalCode: '049909',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.2854,
      lng: 103.8510,
    },
    contact: {
      phone: '+65 6532 1234',
      email: 'raffles@dkshhealthcare.com.sg',
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    services: [
      'Obesity Management',
      'Executive Health Screening',
      'Weight Loss Programs',
      'Dietary Planning',
    ],
    description: 'Conveniently located in the CBD, perfect for working professionals seeking obesity management solutions.',
  },
  {
    _type: 'clinic',
    name: 'DKSH Wellness Clinic - Tampines',
    slug: {
      _type: 'slug',
      current: 'dksh-wellness-clinic-tampines',
    },
    clinicType: 'clinic',
    area: 'east',
    featured: false,
    address: {
      street: '201E Tampines Street 23',
      unit: '#02-123',
      city: 'Singapore',
      postalCode: '527201',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.3520,
      lng: 103.9446,
    },
    contact: {
      phone: '+65 6788 4567',
      email: 'tampines@dkshhealthcare.com.sg',
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
    services: [
      'Obesity Management',
      'Weight Loss Consultation',
      'Family Health Services',
      'Nutrition Counseling',
    ],
    description: 'Community-focused clinic in the East, offering extended hours for families seeking weight management support.',
  },
  {
    _type: 'clinic',
    name: 'DKSH TeleHealth Services',
    slug: {
      _type: 'slug',
      current: 'dksh-telehealth-services',
    },
    clinicType: 'telehealth',
    featured: false,
    address: {
      street: 'Online Consultation',
      city: 'Singapore',
      postalCode: '000000',
      country: 'Singapore',
    },
    contact: {
      phone: '+65 6000 1234',
      email: 'telehealth@dkshhealthcare.com.sg',
    },
    hours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 10:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '9:00 AM - 6:00 PM',
    },
    services: [
      'Virtual Obesity Consultations',
      'Online Weight Management',
      'Remote Monitoring',
      'Digital Health Coaching',
    ],
    description: 'Access expert obesity management from the comfort of your home with our comprehensive telehealth services.',
  },
  {
    _type: 'clinic',
    name: 'DKSH Health Hub - Jurong East',
    slug: {
      _type: 'slug',
      current: 'dksh-health-hub-jurong-east',
    },
    clinicType: 'both',
    area: 'west',
    featured: false,
    address: {
      street: '3 Venture Drive',
      unit: '#01-23',
      city: 'Singapore',
      postalCode: '608526',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.3294,
      lng: 103.7443,
    },
    contact: {
      phone: '+65 6567 8901',
      email: 'jurong@dkshhealthcare.com.sg',
    },
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed',
    },
    services: [
      'Obesity Management',
      'Weight Loss Programs',
      'Fitness Assessment',
      'Nutritional Counseling',
      'Telehealth Options',
    ],
    description: 'Modern health hub serving the West region with flexible in-person and virtual consultation options.',
  },
  {
    _type: 'clinic',
    name: 'DKSH Family Clinic - Woodlands',
    slug: {
      _type: 'slug',
      current: 'dksh-family-clinic-woodlands',
    },
    clinicType: 'clinic',
    area: 'north',
    featured: false,
    address: {
      street: '21 Woodlands Close',
      unit: '#03-45 Primz Bizhub',
      city: 'Singapore',
      postalCode: '737854',
      country: 'Singapore',
    },
    location: {
      _type: 'geopoint',
      lat: 1.4355,
      lng: 103.8048,
    },
    contact: {
      phone: '+65 6363 7890',
      email: 'woodlands@dkshhealthcare.com.sg',
    },
    hours: {
      monday: '8:30 AM - 8:00 PM',
      tuesday: '8:30 AM - 8:00 PM',
      wednesday: '8:30 AM - 8:00 PM',
      thursday: '8:30 AM - 8:00 PM',
      friday: '8:30 AM - 8:00 PM',
      saturday: '8:30 AM - 4:00 PM',
      sunday: 'Closed',
    },
    services: [
      'Obesity Management',
      'Family Health Services',
      'Weight Loss Consultation',
      'Lifestyle Modification Programs',
    ],
    description: 'Family-oriented clinic in the North offering personalized obesity management for all ages.',
  },
];

async function addClinics() {
  try {
    console.log('🚀 Starting to add sample clinics to Sanity...\n');

    for (const clinic of sampleClinics) {
      try {
        const result = await client.create(clinic);
        console.log(`✅ Created: ${clinic.name}`);
        console.log(`   ID: ${result._id}`);
        console.log(`   Type: ${clinic.clinicType} ${clinic.area ? `| Area: ${clinic.area}` : ''}`);
        console.log(`   Featured: ${clinic.featured ? 'Yes' : 'No'}\n`);
      } catch (error) {
        console.error(`❌ Failed to create ${clinic.name}:`, error.message);
      }
    }

    console.log('\n🎉 All sample clinics have been added!');
    console.log('\n📍 Next steps:');
    console.log('1. Visit https://mjr-public-portal.sanity.studio to view the clinics');
    console.log('2. Run `npm run dev` and visit http://localhost:3000/act-now to see them on the site');
    console.log('3. You can edit or delete any clinic in the Sanity Studio');

  } catch (error) {
    console.error('❌ Error adding clinics:', error);
    process.exit(1);
  }
}

addClinics();
