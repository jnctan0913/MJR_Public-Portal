import Image from 'next/image'

export default function NotYourFaultSection() {
  return (
    <section className="relative w-full overflow-hidden z-10 bg-[#8B3A3A]">
      {/* Background Image - Red background with woman */}
      <div className="relative w-full h-[calc(100vw*4/3)] md:h-[calc(100vw*648/1600)]">
        {/* Mobile Background Image */}
        <Image
          src="/images/not-your-fault-red-bg-mobile.png"
          alt="It's not your fault - NOW WE KNOW OBESITY IS A DISEASE"
          fill
          className="object-cover w-full h-full md:hidden"
          priority
          sizes="100vw"
        />
        
        {/* Desktop Background Image */}
        <Image
          src="/images/not-your-fault-red-bg.png"
          alt="It's not your fault - NOW WE KNOW OBESITY IS A DISEASE"
          fill
          className="object-cover w-full h-full hidden md:block"
          priority
          sizes="100vw"
        />

        {/* Text overlay on the left */}
        <div className="absolute top-[20%] md:top-1/2 left-0 -translate-y-1/2 z-10 w-full px-4 md:px-8 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-[800px]">
              {/* Heading 1 - It's not your fault... */}
              <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold text-white font-poppins leading-tight mb-1 md:mb-4 lg:mb-6">
                It&apos;s not your fault...
              </h2>

              {/* Heading 2 - NOW WE KNOW */}
              <h3 className="text-3xl md:text-4xl lg:text-[64px] font-extrabold text-[#ffffb3] font-poppins leading-tight mb-0 md:mb-1">
                NOW WE KNOW
              </h3>

              {/* Heading 3 - OBESITY IS A DISEASE */}
              <h1 className="text-4xl md:text-5xl lg:text-[72px] font-extrabold text-[#ffd23a] font-poppins leading-tight lg:leading-[72px] pt-0 md:pt-2">
                OBESITY IS A<br />DISEASE
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

