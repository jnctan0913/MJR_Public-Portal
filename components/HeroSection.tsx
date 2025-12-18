'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { trackVideoPlay } from '@/lib/analytics'

interface HeroSectionProps {
  onVideoPlay?: (isPlaying: boolean) => void
}

export default function HeroSection({ onVideoPlay }: HeroSectionProps = {}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoKey, setVideoKey] = useState(0)
  const [showEntranceVideo, setShowEntranceVideo] = useState(true)
  const [entranceVideoEnded, setEntranceVideoEnded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const entranceVideoRef = useRef<HTMLVideoElement>(null)

  const handlePlayClick = () => {
    setIsVideoPlaying(true)
    setVideoKey(prev => prev + 1)
    onVideoPlay?.(true)
    // Track video play for compliance reporting
    trackVideoPlay('Hero Section Video', 'Hero')
  }

  const handleCloseVideo = () => {
    setIsVideoPlaying(false)
    onVideoPlay?.(false)
  }

  const handleEntranceVideoEnd = () => {
    setEntranceVideoEnded(true)
    setShowEntranceVideo(true) // Keep video visible
  }

  useEffect(() => {
    // Auto-play entrance video on mount
    if (entranceVideoRef.current) {
      entranceVideoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error)
      })
    }
  }, [])

  useEffect(() => {
    if (!isVideoPlaying) return

    // Only enable auto-close on desktop (lg breakpoint and above)
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const mainContentSection = document.getElementById('main-content-section')
    if (!mainContentSection) return

    let observer: IntersectionObserver | null = null

    // Add a delay to prevent immediate closure when video opens
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
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
    }, 1000) // Wait 1 second before starting to monitor scroll

    return () => {
      clearTimeout(timer)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isVideoPlaying, onVideoPlay])

  return (
    <section
      ref={sectionRef}
      className={`fixed left-0 bg-white w-screen overflow-hidden transition-all duration-700 ${
        isVideoPlaying ? 'top-0 z-50 h-screen' : 'top-[60px] md:top-[90px] lg:top-[80px] z-0 h-[calc(100vw*4/3)] md:h-[calc(100vw*802/1600)] lg:h-[calc(100vw*802/1600)]'
      }`}
    >
      {/* Container for both slides - moves horizontally */}
      <div
        className={`flex w-[200%] h-full transition-transform duration-700 ease-in-out ${
          isVideoPlaying ? '-translate-x-1/2' : 'translate-x-0'
        }`}
      >
        {/* First Slide - Entrance Video or Hero Image */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {/* Mobile Hero Image */}
          <div className="absolute inset-0 w-full md:hidden pointer-events-none">
            <Image
              src="/images/hero-resistance-bands-mobile.png"
              alt="Woman with obesity with resistance bands holding her in place attached to the words 'The Body Can Resist Weight Loss'"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          {/* Desktop Entrance Video */}
          {showEntranceVideo && (
            <video
              ref={entranceVideoRef}
              className="absolute inset-0 hidden md:block w-full h-full object-cover"
              playsInline
              muted
              onEnded={handleEntranceVideoEnd}
            >
              <source src="/images/Hero Video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Content Overlay */}
          <div className="relative w-full md:max-w-[1600px] md:mx-auto md:px-10 lg:px-20 h-full flex items-center z-10 pointer-events-none">
            <div className="w-full md:w-[752px] pointer-events-none">
              {/* This space is for content that would overlay the hero image if needed */}
            </div>
          </div>

          {/* Mobile Play Button - always shows */}
          <button
            onClick={handlePlayClick}
            type="button"
            className="md:hidden absolute top-[28%] right-[31%] w-[calc(100vw*48/375)] h-[calc(100vw*48/375)] rounded-full bg-dksh-yellow flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group z-50 cursor-pointer touch-manipulation pointer-events-auto"
            aria-label="Play video"
          >
            <div className="w-0 h-0 border-t-[calc(100vw*8/375)] border-t-transparent border-l-[calc(100vw*14/375)] border-l-white border-b-[calc(100vw*8/375)] border-b-transparent ml-1 group-hover:border-l-dksh-red transition-colors duration-300"></div>
          </button>

          {/* Desktop Play Button - only shows after entrance video ends */}
          {entranceVideoEnded && (
            <button
              onClick={handlePlayClick}
              type="button"
              className="hidden md:flex absolute top-[47.5%] right-[calc(100vw*280/1600)] lg:right-[calc(100vw*264/1600)] xl:right-[calc(100vw*288/1600)] w-[calc(100vw*64/1600)] h-[calc(100vw*64/1600)] rounded-full bg-dksh-yellow items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group z-50 cursor-pointer touch-manipulation pointer-events-auto"
              aria-label="Play video"
            >
              <div className="w-0 h-0 border-t-[calc(100vw*12/1600)] border-t-transparent border-l-[calc(100vw*20/1600)] border-l-white border-b-[calc(100vw*12/1600)] border-b-transparent ml-1 group-hover:border-l-dksh-red transition-colors duration-300"></div>
            </button>
          )}
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
              src="https://www.youtube.com/embed/leLBfBPkkhI?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  )
}

