import Link from 'next/link'

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-white relative">
      {/* Close Button */}
      <div className="sticky top-4 z-50 max-w-[1200px] mx-auto px-8 pt-4">
        <div className="flex justify-end items-center">
          <Link 
            href="/"
            className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-dksh-red text-dksh-black hover:text-white rounded-full transition-all duration-300 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8 pb-16">
        <h1 className="text-4xl font-bold text-dksh-black mb-8 font-poppins">Terms of Use</h1>
        
        <div className="space-y-6 text-base text-dksh-black font-poppins leading-relaxed">
          <p>
            Welcome to the website of DKSH Singapore Pte. Ltd. ("DKSH"). By accessing or using this website, you accept and agree without limitation or qualification to be bound by the Terms of Use contained herein. If you do not agree to these Terms of Use, you are not permitted to use the website.
          </p>

          <p>
            The information provided on this website is for informational purposes only and is not intended in any way or manner, to be a substitute for professional medical advice and should not be interpreted as treatment recommendations. Only a qualified healthcare professional who has had an opportunity to interact with the patient in person, with access to the patient's records and the opportunity to conduct appropriate follow-up, can provide recommendations for treatment.
          </p>

          <p>
            Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition. Neither the content nor any other service offered by or through this website is intended to be relied on for medical diagnosis or treatment, without a physician's interaction and involvement. Never disregard medical advice or delay in seeking it because of something you have read on this website.
          </p>

          <p className="font-bold">
            THIS WEBSITE AND THE CONTENT ARE PROVIDED "AS IS". DKSH, ITS LICENSORS, AND ITS SUPPLIERS, TO THE FULLEST EXTENT PERMITTED BY LAW, DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE. SPECIFICALLY, DKSH, ITS LICENSORS, AND ITS SUPPLIERS MAKE NO REPRESENTATIONS OR WARRANTIES ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS, CURRENTNESS, SUITABILITY OR TIMELINESS OF THE CONTENT, SOFTWARE, TEXT, GRAPHICS, TOOLS, LINKS, OR COMMUNICATIONS PROVIDED ON OR THROUGH THE USE OF THE WEBSITE OR DKSH, OR ON ANY WEBSITE OR WEBSITES "LINKED" TO THIS WEBSITE. DKSH MAKES NO WARRANTY THAT THE WEBSITE WILL BE AVAILABLE, UNINTERRUPTED, ERROR FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>

          <p className="font-bold">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DKSH, ITS LICENSORS, ITS SUPPLIERS, OR ANY THIRD PARTIES MENTIONED ON THE WEBSITE BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, INCIDENTAL AND CONSEQUENTIAL DAMAGES, PERSONAL INJURY/WRONGFUL DEATH, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION) RESULTING FROM THE USE OR INABILITY TO USE THE WEBSITE OR THE CONTENT OR ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, EFFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS, LINE SYSTEM FAILURE, LOSS OF DATA, OR LOSS OF USE RELATED TO THE WEBSITE OR ANY WEB SITE OPERATED BY ANY THIRD PARTY, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT DKSH IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOU ARE DISSATISFIED WITH US, ANY OF OUR SERVICES OR THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE WEBSITE.
          </p>

          <p>
            Any claims arising in connection with your use of the website or any content must be brought within one (1) year of the date of the event giving rise to such action occurred.
          </p>

          <p>
            As a resource to our visitors, this website provides links to other web sites. However, because we do not control the content of the other websites we may link to, and due to their constantly changing nature, we cannot be responsible for the content, practices or standards of third-party websites. DKSH does not endorse the content on any third-party websites. DKSH is not responsible for the content of linked third-party websites, websites framed within the website, or third-party advertisements, and does not make any representations regarding their content or accuracy. Your use of third-party websites is at your own risk and subject to the terms and conditions of use for such websites.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">Intellectual Property Rights</h2>

          <p>
            Everything that you read or see on the website is copyrighted or otherwise protected and owned by DKSH or a third party who licensed or granted to DKSH the right to use such material. Unless otherwise expressly noted, nothing that you read or see on the site may be copied or used except as provided in these Terms of Use or with the prior written approval of DKSH.
          </p>

          <p>
            We grant you permission to print individual pages from the website, unless otherwise expressly provided herein, for your own personal, non-commercial use in learning about the services or products offered by DKSH or for your non-commercial use in connection with healthcare or education. If you are a healthcare professional or provider, you may print individual pages from the website, unless otherwise expressly provided, and share the information and materials with others. No other permission is granted to you to print, copy, reproduce, distribute, license, transfer, sale, transmit, upload, download, store, display, alter, create or modify any information, images, text or documents contained in this website or any portion thereof in any electronic medium or in hard copy, or create any derivative work based on such information, images, text or documents, without the express written consent of DKSH.
          </p>

          <p>
            This grant of permission is not a transfer of title, and under this permission you may not:
          </p>

          <ul className="list-disc pl-8 space-y-2">
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Remove any copyright, trademark or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <p>
            We make no warranties or representations to you that your use of any materials displayed on the website will not infringe the rights of third parties.
          </p>

          <p>
            Unless otherwise indicated, all logos, names, designs, and marks on the website are trademarks or service marks owned or used under license by DKSH. The use or misuse of any of these marks or other information is strictly prohibited.
          </p>

          <p>
            Nothing contained herein shall be construed as conferring by implication, estoppel or otherwise any license or right under any patent or trademark of DKSH or any third party. Except as expressly provided above nothing contained herein shall be construed as conferring any license or right under any DKSH copyright.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">User Submissions</h2>

          <p>
            Except as expressly set forth on the website, if you submit any information to us, including any comments, remarks, questions, queries, suggestions, ideas, notes, drawings, graphics, concepts, or other information, you are giving that information, and all your rights in it, to DKSH free of charge and such information shall be deemed to be non-confidential and DKSH shall have no obligation of any kind with respect to such information and shall be free to reproduce, use, disclose and distribute the information to others without limitation, without your consent or any compensation to you or anyone else. DKSH shall be free to use any know-how or techniques contained in such information for any purpose whatsoever including but not limited to developing, manufacturing and marketing products incorporating such information. This is true whether you submit such information to us by e-mail, through a form on the website, on a bulletin board, or in any other manner. DKSH may from time to time monitor, review and, in its sole discretion, modify or delete any postings you make on the website however, DKSH is not obligated to do so.
          </p>

          <p>
            DKSH assumes no liability whatsoever to update any forward-looking statements that may be contained on the website or to conform them to future events or developments.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">User Conduct</h2>

          <p>
            You agree not to submit or transmit any material that is unlawful, threatening, libelous, defamatory, obscene, pornographic, profane, or might in any other way violate any law, regulation, or rule. You are solely responsible for any material you submit to the website. You further agree not to upload, email, post or transmit to, or distribute or otherwise publish through the website any material which disrupts the normal operation of the website, including posting or otherwise transmitting material that is not related to the subject at issue or otherwise restricts or inhibits any other user from using the website. Through your usage of the website, you may submit and/or DKSH may gather certain limited information about you and your website usage. We are free to use such information for any purpose we deem appropriate, including marketing purposes.
          </p>

          <p>
            To obtain full access to the website, you may be required to complete a registration. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You accept responsibility for all activities that occur under your account or password and such use shall be deemed to be use by you. You will ensure that all use of your account fully complies with these Terms of Use. Transfer of the account by you to any other person or entity is prohibited.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">Data Transmission</h2>

          <p>
            When using the website, information will be transmitted over a medium that is beyond the control and jurisdiction of DKSH and its suppliers. Accordingly, DKSH assumes no liability for or relating to the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of this website.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">Indemnification</h2>

          <p>
            You agree to indemnify, defend and hold harmless DKSH, its officers, directors, employees, agents, suppliers and third party partners from and against all losses, expenses, damages and costs, including reasonable legal fees, resulting from any violation by you of these Terms of Use.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">Jurisdiction and Governing Law</h2>

          <p>
            This website is intended for the exclusive use of residents of Singapore. DKSH makes no representation that the materials on the website are appropriate or available for use in other locations. Access to this website or the content therein may not be legal by certain persons or in certain countries outside Singapore. If you access this website from outside Singapore, you do so at your own risk and are responsible for compliance with the laws of your jurisdiction.
          </p>

          <p>
            These Terms of Use and your use of this website are governed by the laws of Singapore, without regard to its conflict of laws principles. If any provision of these Terms of Use is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms of Use. You expressly agree that exclusive jurisdiction for any dispute with DKSH, or in any way relating to your use of this website, resides in the courts of Singapore.
          </p>

          <h2 className="text-2xl font-bold text-dksh-black mt-8 mb-4">Modifications and Termination</h2>

          <p>
            DKSH reserves the right to discontinue or to make partial or complete modifications to this website or to these Terms of Use, at its own discretion and without notice to you. DKSH may terminate this Terms of Use agreement, terminate your access to all or part of the website, or suspend any user's access to all or part of the website, at any time, without notice to you, if it believes, in its sole judgment, that you have breached or may breach any term or condition of this Terms of Use agreement, or for its convenience. You may terminate this agreement at any time by destroying all materials received from the website and ceasing to use the website.
          </p>

          <p>
            Except as expressly provided in a particular "legal notice" on this website, these Terms of Use constitute the entire agreement between you and DKSH with respect to the use of this website, and content. Your use of this website is also subject to the Privacy Statement.
          </p>

          <p className="text-sm text-dksh-gray mt-12">
            Last Updated: December 2025
          </p>
        </div>
      </div>
    </main>
  )
}

