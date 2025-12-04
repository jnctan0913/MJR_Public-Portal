export default function MainContentSection() {
  return (
    <section id="main-content-section" className="relative bg-white py-8 md:py-12 z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="max-w-[1504px] mx-auto">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dksh-black mb-4 md:mb-6 font-poppins">
            It&apos;s time for a real change in weight loss
          </h1>

          {/* Paragraph 1 */}
          <p className="text-base text-dksh-black mb-4 font-poppins">
            We know that it can be difficult to lose and keep weight off. Even when you try to eat healthy and stay active, it can be hard to sustain weight loss, making you feel like you are stuck in a cycle of trying to lose weight and gaining it back.<sup className="text-xs">1,2</sup>
          </p>

          {/* Paragraph 2 */}
          <p className="text-base text-dksh-black mb-8 md:mb-11 font-poppins">
            So, it makes you wonder if something else is going on that you need to understand. Fortunately, the understanding of obesity is changing, helping us rethink how we talk about and treat obesity.
          </p>

          {/* Button */}
          <button className="min-w-button px-6 md:px-[41.6px] py-3 md:py-[10px] bg-dksh-red text-white text-base md:text-lg font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300 ease-out min-h-[44px] touch-manipulation">
            Learn more about obesity
          </button>
        </div>
      </div>
    </section>
  )
}

