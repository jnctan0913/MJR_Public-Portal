'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function BMISection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [risk, setRisk] = useState('')

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (h > 0 && w > 0) {
      let heightInMeters: number
      let weightInKg: number

      // Convert height to meters
      if (heightUnit === 'cm') {
        heightInMeters = h / 100
      } else {
        // Convert feet to meters (1 ft = 0.3048 m)
        heightInMeters = h * 0.3048
      }

      // Convert weight to kg
      if (weightUnit === 'kg') {
        weightInKg = w
      } else {
        // Convert pounds to kg (1 lb = 0.453592 kg)
        weightInKg = w * 0.453592
      }

      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
      setBmi(parseFloat(calculatedBMI.toFixed(1)))

      // Determine category and risk
      if (calculatedBMI >= 27.5) {
        setCategory('Obese')
        setRisk('High Risk')
      } else if (calculatedBMI >= 23.0) {
        setCategory('Overweight')
        setRisk('Moderate Risk')
      } else if (calculatedBMI >= 18.5) {
        setCategory('Normal')
        setRisk('Low risk (healthy range)')
      } else {
        setCategory('Underweight')
        setRisk('Low risk')
      }
    }
  }

  const getRiskColor = () => {
    if (category === 'Obese') return 'bg-red-100 border-red-500'
    if (category === 'Overweight') return 'bg-orange-100 border-orange-500'
    if (category === 'Normal') return 'bg-green-100 border-green-500'
    return 'bg-blue-100 border-blue-500'
  }

  return (
    <section id="bmi-section" ref={sectionRef} className="relative bg-dksh-light-pink py-8 md:py-12 lg:py-16 z-10 overflow-hidden">
      <div className={`max-w-[1600px] mx-auto px-4 md:px-8 lg:px-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-[1504px] mx-auto">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dksh-black mb-6 md:mb-8 font-poppins text-center md:text-left">
            Are you living with obesity?
          </h2>

          {/* Subheading */}
          <h3 className="text-2xl md:text-3xl font-bold text-dksh-black mb-4 md:mb-6 font-poppins">
            Body Mass Index (BMI) and Obesity
          </h3>

          {/* First Paragraph */}
          <p className="text-base text-dksh-black mb-6 font-poppins leading-relaxed">
            There are different considerations when defining obesity—it is more complicated than just a number on a scale.<sup className="text-xs">8</sup> Obesity is a complex chronic and progressive disease and while BMI can be used to categorize obesity, your doctor may consider additional factors.<sup className="text-xs">9</sup> Some of these factors include the measurement of waist circumference and waist to hip ratio and the effect that excess body fat has on your health and quality of life whether that be medically, functionally, or psychologically.<sup className="text-xs">10</sup> BMI is calculated by comparing your weight to your height and can be an initial indicator on whether you should speak with your doctor.
          </p>

          {/* Calculator Heading */}
          <h3 className="text-2xl md:text-3xl font-bold text-dksh-black mb-6 md:mb-8 font-poppins">
            Check your BMI and health risks
          </h3>

          {/* BMI Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-6 md:gap-8 lg:gap-12 mt-6 md:mt-8">
            {/* Left Column - Calculator with integrated results */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg h-auto lg:h-[440px] flex flex-col">
              <h2 className="text-xl font-bold text-center mb-3 font-poppins text-dksh-black tracking-wide">
                BMI Calculator
              </h2>
              <div className="w-full h-0.5 bg-dksh-black mb-5"></div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 md:gap-6 lg:gap-8 items-center flex-1">
                {/* Left: Input Fields */}
                <div className="flex flex-col">
                  {/* Height Input */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 text-base font-poppins mb-2 text-dksh-black">
                      <span className="text-2xl text-dksh-red">≡</span>
                      <span>Height (in {heightUnit})</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="flex-1 p-2.5 rounded-lg border border-gray-200 text-dksh-black text-base font-poppins focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none transition-all shadow-sm"
                        placeholder={heightUnit === 'cm' ? '170' : '5.7'}
                      />
                      <select
                        value={heightUnit}
                        onChange={(e) => {
                          setHeightUnit(e.target.value as 'cm' | 'ft')
                          setHeight('')
                          setBmi(null)
                        }}
                        className="px-2 py-2 rounded-lg border border-gray-200 text-dksh-black text-base font-poppins focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none bg-white transition-all cursor-pointer shadow-sm"
                      >
                        <option value="cm">cm</option>
                        <option value="ft">ft</option>
                      </select>
                    </div>
                  </div>

                  {/* Weight Input */}
                  <div className="mb-5">
                    <label className="flex items-center gap-2 text-base font-poppins mb-2 text-dksh-black">
                      <span className="text-2xl text-dksh-red">⚖</span>
                      <span>Weight (in {weightUnit})</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="flex-1 p-2.5 rounded-lg border border-gray-200 text-dksh-black text-base font-poppins focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none transition-all shadow-sm"
                        placeholder={weightUnit === 'kg' ? '70' : '154'}
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => {
                          setWeightUnit(e.target.value as 'kg' | 'lbs')
                          setWeight('')
                          setBmi(null)
                        }}
                        className="px-2 py-2 rounded-lg border border-gray-200 text-dksh-black text-base font-poppins focus:border-dksh-red focus:ring-2 focus:ring-dksh-red/20 focus:outline-none bg-white transition-all cursor-pointer shadow-sm"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculate Button & Reset */}
                  <div className="flex gap-3">
                    <button
                      onClick={calculateBMI}
                      className="flex-[3] bg-dksh-red text-white py-3 md:py-[10px] rounded-button text-base md:text-lg font-semibold font-poppins hover:bg-dksh-dark-red transition-colors duration-300 ease-out min-h-[44px] touch-manipulation"
                    >
                      Calculate BMI
                    </button>
                    <button
                      onClick={() => {
                        setHeight('')
                        setWeight('')
                        setBmi(null)
                        setCategory('')
                        setRisk('')
                      }}
                      className="flex-1 bg-dksh-red text-white py-3 md:py-[10px] rounded-button text-base md:text-lg font-semibold font-poppins hover:bg-dksh-dark-red transition-colors duration-300 ease-out flex items-center justify-center min-h-[44px] min-w-[44px] touch-manipulation"
                      title="Reset Calculator"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right: Results Display Area */}
                <div className="flex items-center justify-center h-full">
                  {bmi === null ? (
                    <div className="text-center px-6">
                      <p className="text-base text-dksh-black font-poppins leading-relaxed">
                        Fill in your height and weight in order to receive your result.
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-3xl overflow-hidden group flex items-center justify-center">
                      {/* Glassmorphism background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-xl"></div>
                      
                      {/* Animated gradient border */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                        category === 'Obese' ? 'from-red-400 via-red-500 to-red-600' :
                        category === 'Overweight' ? 'from-orange-400 via-orange-500 to-orange-600' :
                        category === 'Normal' ? 'from-green-400 via-green-500 to-green-600' :
                        'from-blue-400 via-blue-500 to-blue-600'
                      } opacity-60 blur-sm group-hover:opacity-80 transition-all duration-500`}></div>
                      
                      {/* Inner glass content */}
                      <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-xl w-full h-full flex items-center">
                        <div className="w-1/3 flex flex-col items-center justify-center px-4">
                          <h3 className="text-base font-bold text-dksh-black/80 mb-2 font-poppins tracking-wide text-center whitespace-nowrap">
                            Your BMI
                          </h3>
                          
                          {/* BMI number with glow effect */}
                          <div className="relative inline-block">
                            <div className={`absolute inset-0 blur-2xl opacity-50 ${
                              category === 'Obese' ? 'bg-red-400' :
                              category === 'Overweight' ? 'bg-orange-400' :
                              category === 'Normal' ? 'bg-green-400' :
                              'bg-blue-400'
                            }`}></div>
                            <div className="relative text-5xl font-extrabold bg-gradient-to-br from-dksh-black via-gray-800 to-dksh-black bg-clip-text text-transparent font-poppins">
                              {bmi}
                            </div>
                          </div>
                        </div>
                        <div className="w-2/3 flex items-center justify-center">
                          <div className="relative w-full h-full flex items-center justify-center">
                            {category === 'Normal' && (
                              <div className="text-center px-4">
                                <div className="flex justify-center mb-1.5">
                                  <Image
                                    src="/images/Normal_weight.png"
                                    alt="Normal Weight"
                                    width={70}
                                    height={70}
                                    className="object-contain"
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-green-600 font-poppins mb-1">
                                  Normal Weight
                                </h4>
                                <p className="text-sm text-dksh-black/80 font-poppins leading-snug mb-2.5">
                                  Keep up the great work with balanced nutrition and regular physical activity.
                                </p>
                                <button className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold font-poppins hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                                  Learn More
                                </button>
                              </div>
                            )}
                            {category === 'Overweight' && (
                              <div className="text-center px-4">
                                <div className="flex justify-center mb-2">
                                  <Image
                                    src="/images/Overweight.png"
                                    alt="Overweight"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-orange-600 font-poppins mb-1">
                                  Overweight
                                </h4>
                                <p className="text-sm text-dksh-black/80 font-poppins leading-snug mb-3">
                                  Consider consulting with a healthcare professional about healthy lifestyle changes.
                                </p>
                                <button className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold font-poppins hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 animate-pulse">
                                  Act Now!
                                </button>
                              </div>
                            )}
                            {category === 'Obese' && (
                              <div className="text-center px-4">
                                <div className="flex justify-center mb-2">
                                  <Image
                                    src="/images/Obese.png"
                                    alt="Obese"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-red-600 font-poppins mb-1">
                                  Obese
                                </h4>
                                <p className="text-sm text-dksh-black/80 font-poppins leading-snug mb-3">
                                  We strongly recommend speaking with your doctor about personalized treatment options and support.
                                </p>
                                <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold font-poppins hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 animate-pulse">
                                  Act Now!
                                </button>
                              </div>
                            )}
                            {category === 'Underweight' && (
                              <div className="text-center px-4">
                                <div className="flex justify-center mb-2">
                                  <Image
                                    src="/images/Underweight.png"
                                    alt="Underweight"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-blue-600 font-poppins mb-1">
                                  Underweight
                                </h4>
                                <p className="text-sm text-dksh-black/80 font-poppins leading-snug mb-3">
                                  Consider consulting with a healthcare professional for guidance.
                                </p>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold font-poppins hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 animate-pulse">
                                  Act Now!
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - BMI Categories Table */}
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg h-auto lg:h-[440px] flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-dksh-black mb-4 md:mb-5 font-poppins text-center">
                BMI Categories and Health Risks
              </h3>

              <div className="flex-1 flex flex-col justify-between px-2 md:px-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-dksh-black">
                    <th className="text-left py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-bold text-dksh-black font-poppins">BMI</th>
                    <th className="text-left py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-bold text-dksh-black font-poppins">Category</th>
                    <th className="text-left py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-bold text-dksh-black font-poppins">Risk of health problems</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b border-gray-300 transition-all ${category === 'Normal' ? 'bg-green-100 font-bold' : ''}`}>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">18.5 – 22.9</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-semibold text-dksh-black font-poppins">Normal</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">Low risk (healthy range)</td>
                  </tr>
                  <tr className={`border-b border-gray-300 transition-all ${category === 'Overweight' ? 'bg-orange-100 font-bold' : ''}`}>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">23.0 – 27.4</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-semibold text-dksh-black font-poppins">Overweight</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">Moderate Risk</td>
                  </tr>
                  <tr className={`transition-all ${category === 'Obese' ? 'bg-red-100 font-bold' : ''}`}>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">≥ 27.5</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base font-semibold text-dksh-black font-poppins">Obese</td>
                    <td className="py-2 md:py-3 px-1 md:px-2 text-sm md:text-base text-dksh-black font-poppins">High Risk</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-100 rounded-lg">
                <p className="text-xs md:text-sm text-dksh-black font-poppins">
                  <strong>Note:</strong> BMI categories can differ depending on a person's ethnicity. Remember, your BMI is just one indicator for obesity—it is always best to talk with your doctor about it.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

