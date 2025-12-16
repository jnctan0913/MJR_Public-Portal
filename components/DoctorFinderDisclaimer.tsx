import Link from 'next/link'

export default function DoctorFinderDisclaimer() {
  return (
    <section className="py-6 md:py-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm md:text-base font-semibold text-dksh-black mb-3 font-poppins">
            Disclaimer:
          </h3>
          <p className="text-xs md:text-sm text-dksh-gray leading-relaxed">
            Healthcare service providers listed on this website operate independently from DKSH and
            in accordance with their own professional standards and legal obligations. DKSH does not
            control or endorse the medical advice, diagnosis, or treatment provided by these healthcare
            professionals. DKSH is not responsible for the quality of care, outcomes, or any adverse
            events that may occur as a result of consultations or treatment provided by the listed
            healthcare providers. To learn more, please visit{' '}
            <Link href="/terms-of-use" className="text-dksh-red hover:underline">
              Terms of Use
            </Link>
            {' '}and{' '}
            <Link href="/privacy-statement" className="text-dksh-red hover:underline">
              Privacy Statement
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
