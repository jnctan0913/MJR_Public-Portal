import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AccessibilityStatementPage() {
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
      <div id="main-content" className="pt-[134px] md:pt-[148px] lg:pt-[155px]">
        <div className="max-w-[1200px] mx-auto px-8 py-8 pb-16">
        <h1 className="text-4xl font-bold text-dksh-black mb-8 font-poppins">Accessibility Statement</h1>
        
        <div className="space-y-6 text-base text-dksh-black font-poppins leading-relaxed">
          <p>
            DKSH Singapore Pte. Ltd. ("DKSH") is committed to creating accessible websites that are easy to use and easy to get to for all people, regardless of ability or technology.
          </p>

          <p>
            We set high standards for website accessibility and strive to follow all related laws and guidelines when creating our websites. Here are some of the ways we make our websites easy to use:
          </p>

          <ul className="list-disc pl-8 space-y-3 my-6">
            <li>
              Our goal is to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines are recognized around the world as the standard measure of success and outline ways to make web content easily accessible for everyone, including people with disabilities.
            </li>
            <li>
              We make sure our websites work properly with smartphones, tablets, desktops, and screen readers – and support other assistive technologies, such as magnifiers, voice recognition software, and switch technology.
            </li>
            <li>
              We also work with accessibility experts and partner organizations to ensure we are doing everything we can to create better, more user-friendly online experiences for all.
            </li>
          </ul>

          <p>
            For the best online experience, please use the most current version of your web browser or assistive technology. If you have trouble getting to or using our websites, please contact us at accessibility@dksh.com.
          </p>

          <div className="bg-dksh-light-gray p-6 rounded-lg mt-8">
            <p className="text-sm">
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1 AA</strong>
            </p>
            <p className="text-sm mt-2">
              This statement aligns with Singapore's digital accessibility standards and the Personal Data Protection Act (PDPA).
            </p>
          </div>

          <div className="border-t border-gray-300 mt-12 pt-6">
            <p className="text-sm text-dksh-gray">
              <strong>Last Updated:</strong> December 2025
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

