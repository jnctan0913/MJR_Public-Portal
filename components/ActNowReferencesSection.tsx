'use client'

import { useState } from 'react'

export default function ActNowReferencesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-dksh-pale-blue via-[#e8f0f5] to-dksh-pale-blue py-6 md:py-8 lg:py-12 z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="max-w-[1504px] mx-auto">
          {/* References Button/Header - Glassmorphism */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full backdrop-blur-lg bg-white/40 border border-white/60 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 mb-2 md:mb-3 hover:bg-white/50 hover:border-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-bold text-dksh-dark-blue font-poppins tracking-wide">References</h3>
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm">
                <span className="text-2xl text-dksh-green-sage transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </div>
            </div>
          </button>

          {/* References Content - Collapsible with Glassmorphism */}
          {isExpanded && (
            <div className="backdrop-blur-md bg-white/60 border border-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 animate-fadeIn shadow-xl" style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
            }}>
            <div className="space-y-2 md:space-y-3">
              <p className="font-poppins p-2 md:p-3 rounded-lg md:rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-2 md:mr-3 flex-shrink-0">1</span>
                <span className="text-xs md:text-xs md:text-sm text-dksh-black">Greenway FL. Physiological adaptations to weight loss and factors favouring weight regain. Int J Obes (Lond). 2015;39(8):1188–1196. doi:10.1038/ijo.2015.59</span>
              </p>

              <p className="font-poppins p-2 md:p-3 rounded-lg md:rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-2 md:mr-3 flex-shrink-0">2</span>
                <span className="text-xs md:text-xs md:text-sm text-dksh-black">Eunice Kennedy Shriver National Institute of Child Health and Human Development.{' '}
                <a href="https://www.nichd.nih.gov/health/topics/obesity/conditioninfo/cause" target="_blank" rel="noopener noreferrer" className="text-dksh-teal hover:text-dksh-dark-blue underline decoration-dksh-teal/30 hover:decoration-dksh-dark-blue transition-colors duration-200">
                  What causes obesity & overweight?
                </a>{' '}
                Reviewed July 28, 2021. Accessed August 5, 2024.</span>
              </p>

              <p className="font-poppins p-2 md:p-3 rounded-lg md:rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all duration-200">
                <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-dksh-dark-blue/10 text-dksh-dark-blue font-semibold text-xs mr-2 md:mr-3 flex-shrink-0">3</span>
                <span className="text-xs md:text-sm text-dksh-black">Hall KD, Kahan S. Maintenance of lost weight and long-term management of obesity. Med Clin North Am. 2018;102(1):183-197. doi:10.1016/j.mcna.2017.08.012</span>
              </p>
            </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
