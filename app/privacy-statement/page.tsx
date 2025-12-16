import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyStatementPage() {
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
        <h1 className="text-4xl font-bold text-dksh-black mb-8 font-poppins">Privacy Statement</h1>
        
        <div className="space-y-6 text-base text-dksh-black font-poppins leading-relaxed">
          <p className="text-lg font-semibold">
            DKSH Singapore Pte. Ltd. ("DKSH", "we", "us", or "our") is committed to protecting your privacy and complying with the Singapore Personal Data Protection Act 2012 ("PDPA").
          </p>

          <p>
            This Privacy Statement explains how we collect, use, disclose, and protect your personal data when you visit our website and use our services. By accessing or using this website, you consent to the collection, use, and disclosure of your personal data as described in this Privacy Statement.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">1. Personal Data We Collect</h2>

          <p>
            We may collect the following types of personal data:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Demographic information (age, gender, location)</li>
            <li>Health-related information you voluntarily provide (such as BMI calculations)</li>
            <li>Technical information (IP address, browser type, device information)</li>
            <li>Usage data (pages visited, time spent on pages, navigation patterns)</li>
            <li>Cookie data and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">2. How We Collect Personal Data</h2>

          <p>
            We collect personal data through:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>Direct interactions when you fill out forms, use calculators, or contact us</li>
            <li>Automated technologies such as cookies and analytics tools</li>
            <li>Third-party sources where permitted by law</li>
          </ul>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">3. Purpose of Data Collection</h2>

          <p>
            We collect and use your personal data for the following purposes:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>To provide you with information about obesity and weight management</li>
            <li>To operate and improve our website and services</li>
            <li>To respond to your inquiries and requests</li>
            <li>To send you educational materials and health information (with your consent)</li>
            <li>To conduct research and analytics to improve our services</li>
            <li>To comply with legal and regulatory requirements</li>
            <li>To protect the security and integrity of our website</li>
          </ul>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">4. Disclosure of Personal Data</h2>

          <p>
            We may disclose your personal data to:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>DKSH affiliates and subsidiaries for business purposes</li>
            <li>Third-party service providers who assist us in operating our website and services</li>
            <li>Healthcare professionals (only with your explicit consent)</li>
            <li>Legal and regulatory authorities when required by law</li>
            <li>Other parties with your consent or as permitted by law</li>
          </ul>

          <p>
            We do not sell, rent, or trade your personal data to third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">5. Data Protection and Security</h2>

          <p>
            We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, collection, use, disclosure, copying, modification, disposal, or similar risks. These measures include:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>Secure server infrastructure and encryption technologies</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security assessments and updates</li>
            <li>Employee training on data protection</li>
          </ul>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">6. Data Retention</h2>

          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws and regulations. When personal data is no longer needed, we will securely delete or anonymize it.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">7. Your Rights Under PDPA</h2>

          <p>
            Under the Singapore PDPA, you have the following rights:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Right to Access:</strong> Request access to your personal data we hold</li>
            <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal data</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent for the collection, use, or disclosure of your personal data at any time</li>
            <li><strong>Right to Data Portability:</strong> Request a copy of your personal data in a commonly used format</li>
          </ul>

          <p>
            To exercise these rights, please contact our Data Protection Officer using the contact information provided below.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">8. Cookies and Tracking Technologies</h2>

          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of certain features on our website.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">9. Third-Party Links</h2>

          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party websites you visit.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">10. Transfer of Personal Data</h2>

          <p>
            Your personal data may be transferred to, stored, and processed in countries outside Singapore, including countries that may not have the same level of data protection as Singapore. When we transfer your personal data internationally, we ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Statement and applicable laws.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">11. Children's Privacy</h2>

          <p>
            This website is not intended for children under the age of 18. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us, and we will take steps to delete such information.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">12. Changes to This Privacy Statement</h2>

          <p>
            We may update this Privacy Statement from time to time to reflect changes in our practices or applicable laws. We will post the updated Privacy Statement on this page with the "Last Updated" date. We encourage you to review this Privacy Statement periodically.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">13. Contact Us</h2>

          <p>
            If you have any questions, concerns, or requests regarding this Privacy Statement or our data protection practices, please contact our Data Protection Officer:
          </p>

          <div className="bg-dksh-light-gray p-6 rounded-lg mt-4">
            <p className="font-semibold mb-2">DKSH Singapore Pte. Ltd.</p>
            <p>Data Protection Officer</p>
            <p>Email: dpo.singapore@dksh.com</p>
            <p>Address: [DKSH Singapore Office Address]</p>
          </div>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">14. Governing Law</h2>

          <p>
            This Privacy Statement and any dispute arising from it shall be governed by and construed in accordance with the laws of Singapore, and you submit to the exclusive jurisdiction of the Singapore courts.
          </p>

          <div className="border-t border-gray-300 mt-12 pt-6">
            <p className="text-sm text-dksh-gray">
              <strong>Last Updated:</strong> December 2025
            </p>
            <p className="text-sm text-dksh-gray mt-2">
              This Privacy Statement is compliant with the Personal Data Protection Act 2012 (No. 26 of 2012) of Singapore.
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




