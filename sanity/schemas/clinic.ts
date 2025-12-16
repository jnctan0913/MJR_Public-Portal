import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clinic',
  title: 'Clinic',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Clinic Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Clinic',
      type: 'boolean',
      description: 'Display this clinic prominently on the Act Now page',
      initialValue: false,
    }),
    defineField({
      name: 'serviceProvider',
      title: 'Service Provider',
      type: 'object',
      description: 'Information about the clinic or telehealth service provider',
      fields: [
        {
          name: 'type',
          title: 'Provider Type',
          type: 'string',
          options: {
            list: [
              { title: 'Clinic', value: 'clinic' },
              { title: 'Telehealth Service', value: 'telehealth_service' },
            ],
            layout: 'radio',
          },
          initialValue: 'clinic',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'website',
          title: 'Website URL',
          type: 'url',
          description: 'Official website (for telehealth services, this will be the clickable link)',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
          }),
        },
        {
          name: 'clinicPageUrl',
          title: 'Clinic Page URL',
          type: 'url',
          description: 'Link to the clinic\'s detailed page (only for physical clinics)',
          hidden: ({ parent }) => parent?.type === 'telehealth_service',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
          }),
        },
      ],
    }),
    defineField({
      name: 'area',
      title: 'Area in Singapore',
      type: 'string',
      options: {
        list: [
          { title: 'Central', value: 'central' },
          { title: 'North', value: 'north' },
          { title: 'South', value: 'south' },
          { title: 'East', value: 'east' },
          { title: 'West', value: 'west' },
          { title: 'North-East', value: 'north-east' },
        ],
        layout: 'dropdown',
      },
      description: 'Select the region where the clinic is located (not applicable for telehealth-only)',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'unit',
          title: 'Unit/Floor',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Singapore',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Map Location',
      type: 'geopoint',
      description: 'Pin the clinic location on the map for Google Maps integration',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phoneNumbers',
          title: 'Phone Numbers',
          type: 'array',
          description: 'Add one or more phone numbers with contact type',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Contact Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'WhatsApp', value: 'whatsapp' },
                      { title: 'Phone Call', value: 'phone' },
                    ],
                    layout: 'radio',
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'number',
                  title: 'Phone Number',
                  type: 'string',
                  description: 'Include country code (e.g., +6591234567)',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'label',
                  title: 'Label (optional)',
                  type: 'string',
                  description: 'e.g., "Main Line", "After Hours"',
                },
              ],
              preview: {
                select: {
                  type: 'type',
                  number: 'number',
                  label: 'label',
                },
                prepare({ type, number, label }) {
                  return {
                    title: `${type === 'whatsapp' ? '📱 WhatsApp' : '☎️ Phone'}: ${number}`,
                    subtitle: label || '',
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).error('At least one phone number is required'),
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Clinic/Provider Image',
      type: 'image',
      description: 'For physical clinics: upload clinic building photo. For telehealth: upload provider logo',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'doctors',
      title: 'Doctors',
      type: 'array',
      description: 'List of doctors available at this clinic (optional)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Doctor Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'photo',
              title: 'Doctor Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                },
              ],
            },
            {
              name: 'specialization',
              title: 'Specialization',
              type: 'string',
              description: 'e.g., Obesity Medicine, Endocrinology',
            },
            {
              name: 'qualifications',
              title: 'Qualifications',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'e.g., MBBS, MRCP, FAMS',
            },
            {
              name: 'bio',
              title: 'Biography',
              type: 'text',
              rows: 6,
              description: 'Brief biography or description of the doctor',
            },
            {
              name: 'languagesSpoken',
              title: 'Languages Spoken',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Languages the doctor can communicate in',
            },
            {
              name: 'yearsOfExperience',
              title: 'Years of Experience',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'specialization',
              media: 'photo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      media: 'image',
    },
  },
})
