import { Metadata } from 'next'
import Header from '@/components/Header'
import ActNowHeroSection from '@/components/ActNowHeroSection'
import ActNowIntroSection from '@/components/ActNowIntroSection'
import ClinicsListingSection from '@/components/ClinicsListingSection'
import ActNowReferencesSection from '@/components/ActNowReferencesSection'
import DoctorFinderDisclaimer from '@/components/DoctorFinderDisclaimer'
import Footer from '@/components/Footer'
import { getAllClinics } from '@/lib/clinics'

export const metadata: Metadata = {
  title: 'Act Now - Find a Doctor | Obesity Management',
  description:
    'Take the next step towards a healthier you. Find a qualified doctor near you who can help with obesity management and weight loss guidance.',
}

export default async function ActNowPage() {
  // Fetch clinics from Sanity
  const clinics = await getAllClinics()

  // Static page content
  const ctaHeading = 'Find a Doctor Near You'
  const ctaDescription = undefined

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-dksh-red text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Header */}
      <div className="fixed top-0 z-50 w-full">
        <Header />
      </div>

      {/* Main Content */}
      <div id="main-content" className="lg:pt-0">
        {/* Hero Section */}
        <ActNowHeroSection />
        {/* Spacer to push content down below fixed hero */}
        <div className="h-[720px] md:h-[618px] lg:h-[707px]"></div>

        {/* Introduction Section */}
        <ActNowIntroSection />

        {/* Clinics Listing Section */}
        <ClinicsListingSection
          clinics={clinics}
          heading={ctaHeading}
          description={ctaDescription}
        />

        {/* References Section */}
        <ActNowReferencesSection />

        {/* Disclaimer */}
        <DoctorFinderDisclaimer />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
