import Image from 'next/image'

export default function YellowBandSection() {
  return (
    <section className="relative w-full h-[100px] overflow-visible z-20 -my-8">
      {/* Yellow Band Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/yellow-bar-background.png"
          alt="Yellow decorative band"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}

