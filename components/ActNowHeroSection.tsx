import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'

interface ActNowHeroSectionProps {
  heading?: string
  subheading?: string
  backgroundImage?: any
  backgroundImageMobile?: any
}

export default function ActNowHeroSection({
  heading = 'It is time to change our approach to Obesity!',
  subheading = 'Speak to a doctor today.',
  backgroundImage,
  backgroundImageMobile,
}: ActNowHeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-dksh-red">
      {/* Hero Container with responsive height */}
      <div className="relative w-full h-[calc(100vw*0.8)] md:h-[calc(100vw*0.4)] lg:h-[calc(100vw*0.35)] max-h-[500px]">
        {/* Background Image - Mobile */}
        {backgroundImageMobile ? (
          <div className="absolute inset-0 md:hidden">
            <Image
              src={urlFor(backgroundImageMobile).width(800).height(1000).url()}
              alt="Take action for your health"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 md:hidden bg-gradient-to-b from-dksh-dark-red to-dksh-red"></div>
        )}

        {/* Background Image - Desktop */}
        {backgroundImage ? (
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={urlFor(backgroundImage).width(1920).height(800).url()}
              alt="Take action for your health"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-dksh-dark-red to-dksh-red"></div>
        )}

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dksh-red/80 via-dksh-red/50 to-transparent"></div>

        {/* Content Overlay */}
        <div className="relative w-full h-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20 flex items-center z-10">
          <div className="max-w-[800px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white font-poppins leading-tight mb-4 md:mb-6">
              {heading}
            </h1>
            {subheading && (
              <p className="text-lg md:text-xl lg:text-2xl text-white font-poppins font-medium">
                {subheading}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
