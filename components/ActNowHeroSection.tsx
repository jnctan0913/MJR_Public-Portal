import Image from 'next/image'

interface ActNowHeroSectionProps {
  heading?: string
  subheading?: string
}

export default function ActNowHeroSection({
  heading = 'It is time to change our approach to Obesity!',
  subheading = 'Speak to a doctor today.',
}: ActNowHeroSectionProps) {
  return (
    <section className="fixed top-[60px] md:top-[90px] lg:top-[113px] left-0 w-full overflow-hidden bg-gradient-to-r from-pink-50 to-white z-0">
      {/* Hero Container with responsive height */}
      <div className="relative w-full h-[660px] md:h-[528px] lg:h-[594px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/act-now-hero.png"
            alt="Take action for your health"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content Overlay - Positioned on Right Side */}
        <div className="relative w-full h-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20 flex items-center justify-end z-10">
          <div className="w-fit max-w-[450px] md:max-w-[550px] lg:max-w-[640px] bg-dksh-red backdrop-blur-md px-7 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10 rounded-xl shadow-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-poppins leading-snug mb-3 md:mb-5">
              {heading}
            </h1>
            {subheading && (
              <p className="text-lg md:text-xl lg:text-2xl text-white font-poppins font-normal">
                {subheading}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
