import Image from 'next/image'

export default function YellowBandSection() {
  return (
    <section className="relative w-full overflow-visible z-20 -my-8">
      {/* Yellow Band Image */}
      <div className="relative w-full aspect-[375/50] md:aspect-[1600/100]">
        <Image
          src="/images/yellow-bar-background.png"
          alt="Yellow decorative band"
          fill
          className="object-contain w-full h-full"
        />
      </div>
    </section>
  )
}

