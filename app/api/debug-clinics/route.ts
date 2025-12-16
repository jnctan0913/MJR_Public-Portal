import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { clinicsQuery } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const clinics = await client.fetch(clinicsQuery)
    
    return NextResponse.json({
      success: true,
      count: clinics.length,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1x3s3r3w',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      clinics: clinics.map((clinic: any) => ({
        name: clinic.name,
        hasImage: !!clinic.image,
        imageAsset: clinic.image?.asset?._ref || null,
        doctorCount: clinic.doctors?.length || 0,
        doctors: clinic.doctors?.map((doc: any) => ({
          name: doc.name,
          hasPhoto: !!doc.photo,
          photoAsset: doc.photo?.asset?._ref || null,
        })) || []
      }))
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

