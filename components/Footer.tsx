import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative bg-dksh-off-white border-t border-[#afafaf] z-10">
      <div className="max-w-[1600px] mx-auto px-20 py-14">
        <div className="max-w-[1504px] mx-auto">
          {/* Top Section - Product Code and Copyright */}
          <div className="mb-6">
            <p className="text-xs text-dksh-black mb-1 font-poppins">
              Placeholder of Approval # | Date of Approval
            </p>
            <p className="text-xs text-dksh-black font-poppins">
              ©2025. DKSH. All Rights Reserved.
            </p>
          </div>

          {/* Disclaimers */}
          <div className="space-y-3 mb-6">
            <p className="text-xs text-dksh-black font-poppins">
              Nothing on this website should be construed as giving medical advice or making recommendations regarding any health-related decision or action.
            </p>
            <p className="text-xs text-dksh-black font-poppins">
              You should consult a doctor or other qualified healthcare professional regarding any questions about your health or before making any treatment-related decisions.
            </p>
            <p className="text-xs text-dksh-black font-poppins">
              The contents of this site are not intended to substitute the medical judgment of your treating physicians.
            </p>
            <p className="text-xs text-dksh-black font-poppins">
              DKSH will not be held liable for any outcomes due to the inaccurate use of the information provided on this website. Without limitation, the information provided should not replace medical advice received from a healthcare provider or treating doctor.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-300">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-[147px] h-[68px] relative">
                  <Image
                    src="/images/DKSH-logo-footer.png"
                    alt="DKSH"
                    width={147}
                    height={68}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Social Icons and Links */}
              <div>
                {/* Social Icons */}
                <div className="flex items-center gap-4 mb-3 justify-end">
                  <a href="#" className="text-dksh-black hover:text-dksh-red transition-colors duration-300">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.962.925-1.962 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-dksh-black hover:text-dksh-red transition-colors duration-300">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="text-dksh-black hover:text-dksh-red transition-colors duration-300">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4 2.37 4 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="text-dksh-black hover:text-dksh-red transition-colors duration-300">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 text-xs font-poppins">
                  <a href="/terms-of-use" className="text-dksh-medium-blue hover:underline transition-all duration-200">Terms of Use</a>
                  <a href="/privacy-statement" className="text-dksh-medium-blue hover:underline transition-all duration-200">Privacy Statement</a>
                  <a href="/accessibility-statement" className="text-dksh-medium-blue hover:underline transition-all duration-200">Accessibility Statement</a>
                  <a href="#" className="text-dksh-medium-blue hover:underline transition-all duration-200">Sitemap</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
