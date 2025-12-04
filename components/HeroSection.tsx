'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface HeroSectionProps {
  onVideoPlay?: (isPlaying: boolean) => void
}

export default function HeroSection({ onVideoPlay }: HeroSectionProps = {}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoKey, setVideoKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const handlePlayClick = () => {
    setIsVideoPlaying(true)
    setVideoKey(prev => prev + 1)
    onVideoPlay?.(true)
  }

  const handleCloseVideo = () => {
    setIsVideoPlaying(false)
    onVideoPlay?.(false)
  }

  useEffect(() => {
    if (!isVideoPlaying) return

    const mainContentSection = document.getElementById('main-content-section')
    if (!mainContentSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If main content section is becoming visible, close the video
        if (entry.isIntersecting) {
          setIsVideoPlaying(false)
          onVideoPlay?.(false)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the main content section is visible
      }
    )

    observer.observe(mainContentSection)

    return () => observer.disconnect()
  }, [isVideoPlaying, onVideoPlay])

  return (
    <section
      ref={sectionRef}
      className={`sticky top-0 bg-white w-full overflow-hidden z-0 transition-all duration-700 ${
        isVideoPlaying ? 'h-screen' : 'h-[802px]'
      }`}
    >
      {/* Container for both slides - moves horizontally */}
      <div
        className={`flex w-[200%] h-full transition-transform duration-700 ease-in-out ${
          isVideoPlaying ? '-translate-x-1/2' : 'translate-x-0'
        }`}
      >
        {/* First Slide - Hero Image */}
        <div className="relative w-1/2 h-full">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-resistance-bands.png"
              alt="Woman with obesity with resistance bands holding her in place attached to the words 'The Body Can Resist Weight Loss'"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-[1600px] mx-auto px-20 h-full flex items-center">
            <div className="w-[752px]">
              {/* This space is for content that would overlay the hero image if needed */}
            </div>

            {/* Play Button positioned next to "Loss" */}
            <button
              onClick={handlePlayClick}
              className="absolute top-[47%] right-[19%] w-16 h-16 rounded-full bg-dksh-yellow flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group"
              aria-label="Play video"
            >
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1 group-hover:border-l-dksh-red transition-colors duration-300"></div>
            </button>
          </div>
        </div>

        {/* Second Slide - Video */}
        <div className="relative w-1/2 h-full bg-black">
          {/* Close Button */}
          <button
            onClick={handleCloseVideo}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label="Close video"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* YouTube Video Embed - Only render when playing */}
          {isVideoPlaying && (
            <iframe
              key={`video-${videoKey}`}
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/leLBfBPkkhI?autoplay=1&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  )
}

