import Image from 'next/image'

export default function NotYourFaultSection() {
  return (
    <section className="relative w-full h-auto overflow-hidden z-10 bg-[#8B3A3A]">
      {/* Background Image - Red background with woman */}
      <div className="relative w-full h-auto">
        <Image
          src="/images/not-your-fault-red-bg.png"
          alt="It's not your fault - NOW WE KNOW OBESITY IS A DISEASE"
          width={1920}
          height={648}
          className="w-full h-auto object-contain"
          priority
        />
        
        {/* Text overlay on the left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 max-w-[1600px] w-full">
          <div className="pl-20 max-w-[800px]">
            {/* Heading 1 - It's not your fault... */}
            <h2 className="text-[42px] font-bold text-white font-poppins leading-tight mb-6">
              It&apos;s not your fault...
            </h2>

            {/* Heading 2 - NOW WE KNOW */}
            <h3 className="text-[64px] font-extrabold text-[#ffffb3] font-poppins leading-tight mb-1">
              NOW WE KNOW
            </h3>

            {/* Heading 3 - OBESITY IS A DISEASE */}
            <h1 className="text-[72px] font-extrabold text-[#ffd23a] font-poppins leading-[72px] pt-2">
              OBESITY IS A<br />DISEASE
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

