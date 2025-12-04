'use client'

import { useState, useRef, useEffect } from 'react'

export default function ImpactSection() {
  const [showVideo, setShowVideo] = useState(false)
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
    <section ref={sectionRef} className="relative bg-dksh-light-pink z-10 overflow-hidden min-h-[600px]">
      <div className={`flex flex-col lg:flex-row h-full relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Column - Pink Background with Text (35% width) */}
        <div className="bg-dksh-light-pink px-8 lg:px-20 py-16 lg:py-24 flex flex-col justify-center w-full lg:w-[35%] relative z-20">
          <div className="max-w-xl md:max-w-none mx-auto lg:mx-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dksh-black font-poppins mb-8 leading-tight text-center lg:text-left">
              Obesity Can Impact Lives
            </h2>
            
            <h3 className="text-xl font-bold text-dksh-black font-poppins mb-4 leading-tight tracking-wide text-center lg:text-left">
              Living with obesity is more than just a number on a scale—it can impact many aspects of life.
            </h3>

            <p className="text-lg font-semibold text-dksh-black font-poppins mb-8 text-center lg:text-left">
              Start your conversation with a doctor today!
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="min-w-button px-[41.6px] py-[10px] bg-dksh-red text-white text-lg font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300 ease-out">
                Act Now!
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - White Background with Text (65% width) */}
        <div className="bg-white px-8 lg:px-20 py-16 lg:py-24 flex items-center w-full lg:w-[65%] relative">
          <div className={`flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto lg:mx-0 w-full transition-transform duration-500 ease-in-out ${showVideo ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-[16px] text-dksh-black font-poppins mb-8">
                Obesity isn't just about how you appear. It can lead to serious health risks, like high blood pressure, high cholesterol, and sleep disorders,<sup className="text-xs">3,7</sup> as well as an increased risk of developing heart disease, diabetes, and certain cancers.<sup className="text-xs">3,7</sup> It has also been linked to impaired fertility.<sup className="text-xs">11</sup> Beyond physical health, it can impact your mental well-being<sup className="text-xs">8</sup> and relationships.<sup className="text-xs">12</sup>
              </p>
              
              <div className="bg-gray-100 p-8 rounded-2xl border-l-4 border-dksh-red">
                <h4 className="text-xl font-bold text-dksh-red font-poppins mb-3">
                  But you are not alone.
                </h4>
                <p className="text-[16px] text-dksh-black font-poppins">
                  Many others share your experience, and their stories can support you on your way forward. <sup className="text-xs">2,5</sup>
                </p>
              </div>
            </div>

            {/* Play Button Section */}
            <div className="flex flex-col items-center shrink-0">
              <button 
                onClick={() => setShowVideo(true)}
                className="w-24 h-24 rounded-full bg-white border-4 border-dksh-red flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[28px] border-l-dksh-red border-b-[16px] border-b-transparent ml-2 group-hover:scale-110 transition-transform duration-300"></div>
              </button>
              <span className="mt-4 text-dksh-black font-semibold font-poppins text-center">
                Click to hear more stories
              </span>
            </div>
          </div>

          {/* Video Player Overlay - Slides in from right */}
          <div className={`absolute inset-0 bg-black z-30 transition-transform duration-500 ease-in-out ${showVideo ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-8 right-8 text-white hover:text-dksh-red z-40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {showVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/leLBfBPkkhI?autoplay=1&rel=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

