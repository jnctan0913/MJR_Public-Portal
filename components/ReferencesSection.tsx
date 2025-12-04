'use client'

import { useState } from 'react'

export default function ReferencesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-dksh-pale-blue via-[#e8f0f5] to-dksh-pale-blue py-12 z-10">
      <div className="max-w-[1600px] mx-auto px-20">
        <div className="max-w-[1504px] mx-auto">
          {/* References Button/Header - Glassmorphism */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full backdrop-blur-lg bg-white/40 border border-white/60 rounded-2xl p-5 mb-3 hover:bg-white/50 hover:border-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-dksh-dark-blue font-poppins tracking-wide">References</h3>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm">
                <span className="text-2xl text-dksh-green-sage transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </div>
            </div>
          </button>

          {/* References Content - Collapsible with Glassmorphism */}
          {isExpanded && (
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-2xl p-8 animate-fadeIn shadow-xl" style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
            }}>
            <div className="space-y-3">
              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">1</span>
                <span className="text-sm text-dksh-black">ESI Obesity Guidelines Indian Journal of Endocrinology and Metabolism ¦ Volume 26 ¦ Issue 4 ¦ July-August 2022 1a:{' '}
                <a href="#" className="text-dksh-teal hover:text-dksh-dark-blue underline decoration-dksh-teal/30 hover:decoration-dksh-dark-blue transition-colors duration-200">
                  Obesity and overweight
                </a>
                , WHO, 1 March 2024</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">2</span>
                <span className="text-sm text-dksh-black">Hall KD, Kahan S. Maintenance of lost weight and long-term management of obesity. Med Clin North Am. 2018;102(1):183-197. doi:10.1016/j.mcna.2017.08.012</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">3</span>
                <span className="text-sm text-dksh-black">Greenway FL. Physiological adaptations to weight loss and factors favouring weight regain. Int J Obes (Lond). 2015;39(8):1188-1196. doi:10.1038/ijo.2015.59</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">4</span>
                <span className="text-sm text-dksh-black">MacLean PS, Bergouignan A, Cornier MA, Jackman MR. Biology&apos;s response to dieting: the impetus for weight regain. Am J Physiol Regul Integr Comp Physiol. 2011;301(3):R581–R600. doi:10.1152/ajpregu.00755.2010</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">5</span>
                <span className="text-sm text-dksh-black">Melby CL, Paris HL, Foright RM, Peth J. Attenuating the biologic drive for weight regain following weight loss: must what goes down always go back up? Nutrients. 2017;9(5):468. doi:10.3390/nu9050468</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">6</span>
                <span className="text-sm text-dksh-black">Ochner CN, Barrios DM, Lee CD, Pi-Sunyer FX. Biological mechanisms that promote weight regain following weight loss in obese humans. Physiol Behav. 2013;120:106-113. doi:10.1016/j.physbeh.2013.07.009</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">7</span>
                <span className="text-sm text-dksh-black">Roh E, Choi KM. Hormonal gut–brain signaling for the treatment of obesity. Int J Mol Sci 2023;24(4):3384. doi:10.3390/ijms24043384</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">8</span>
                <span className="text-sm text-dksh-black">Sarwer DB, Polonsky HM. The psychosocial burden of obesity. Endocrinol Metab Clin North Am. 2016;45(3):677-688. doi:10.1016/j.ecl.2016.04.016</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">9</span>
                <span className="text-sm text-dksh-black">Busetto L, Dicker D, Frühbeck G, et al. A new framework for the diagnosis, staging and management of obesity in adults. Nat Med. Published online July 5, 2024. doi:10.1038/s41591-024-03095-3</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">10</span>
                <span className="text-sm text-dksh-black">Stephenson J, Smith CM, Kearns B, et al. The association between obesity and quality of life: a retrospective analysis of a large-scale population-based cohort study. BMC Public Health. 2021;21(1):1990. doi:10.1186/s12889-021-12009-8</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">11</span>
                <span className="text-sm text-dksh-black">Barbouni K, Jotautis V, Metallinou D, et al. When Weight Matters: How Obesity Impacts Reproductive Health and Pregnancy-A Systematic Review. Curr Obes Rep. 2025;14(1):37. doi: 10.1007/s13679-025-00629-9.</span>
              </p>

              <p className="font-poppins p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-3">12</span>
                <span className="text-sm text-dksh-black">Albano G, Rowlands K, Baciadonna L, et al. Interpersonal difficulties in obesity: a systematic review and meta-analysis to inform a rejection sensitivity–based model. Neurosci Biobehav Rev. 2019;107:846–861. doi:10.1016/j.neubiorev.2019.09.039.</span>
              </p>
            </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
