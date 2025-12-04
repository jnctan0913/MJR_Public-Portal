'use client'

import { useState, useRef, useEffect } from 'react'

export default function WhyHardSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dksh-light-pink py-8 md:py-12 z-10 overflow-hidden">
      <div className={`w-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="bg-white py-8 md:py-12">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div>
                {/* Heading */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl text-dksh-black font-poppins">
                    <span className="font-bold">So, why is it so hard to loss weight?</span> <span className="font-normal">Because obesity is not a choice!</span>
                  </h2>
                </div>

                {/* Paragraphs */}
                <div className="space-y-6 text-base text-dksh-black font-poppins">
                  <p>
                    Obesity is a chronic disease<sup className="text-xs">1, 1a</sup> and complex factors beyond your control involving not feeling full, increased hunger, and changes in metabolism can cause biological resistance to weight loss.<sup className="text-xs">4,6</sup>
                  </p>

                  <p>
                    If you feel like something is holding you back from reaching and maintaining your weight loss goals, then maybe your body is resisting weight loss, despite all the efforts you make.<sup className="text-xs">2,3</sup>
                  </p>

                  <p>
                    Obesity is influenced by many factors beyond just diet and exercise, like biology, genetics, environment, and society. Therefore, it&apos;s important to approach weight management with a comprehensive science-based strategy that fits your personal needs.<sup className="text-xs">1</sup>
                  </p>
                </div>
              </div>

              {/* Right Column - Video/GIF */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[650px] h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/images/Turn_this_image_202512032302.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
