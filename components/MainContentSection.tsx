export default function MainContentSection() {
  return (
    <section id="main-content-section" className="relative bg-white py-12 z-10">
      <div className="max-w-[1600px] mx-auto px-20">
        <div className="max-w-[1504px] mx-auto">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-dksh-black mb-6 font-poppins">
            It&apos;s time for a real change in weight loss
          </h1>

          {/* Paragraph 1 */}
          <p className="text-base text-dksh-black mb-4 font-poppins">
            We know that it can be difficult to lose and keep weight off. Even when you try to eat healthy and stay active, it can be hard to sustain weight loss, making you feel like you are stuck in a cycle of trying to lose weight and gaining it back.<sup className="text-xs">1,2</sup>
          </p>

          {/* Paragraph 2 */}
          <p className="text-base text-dksh-black mb-11 font-poppins">
            So, it makes you wonder if something else is going on that you need to understand. Fortunately, the understanding of obesity is changing, helping us rethink how we talk about and treat obesity.
          </p>

          {/* Button */}
          <button className="min-w-button px-[41.6px] py-[10px] bg-dksh-red text-white text-lg font-semibold font-poppins rounded-button hover:bg-dksh-dark-red transition-colors duration-300 ease-out">
            Learn more about obesity
          </button>
        </div>
      </div>
    </section>
  )
}

