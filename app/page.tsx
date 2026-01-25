import { Hero } from './components/Hero'
import OutOfSchoolLearning from './components/home/OutOfSchoolLearning'
import MarqueeSponsors from './components/MarqueeSponsors'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <MarqueeSponsors />
      <div className="py-30 px-3 sm:px-4 md:px-6 w-full">
        <div className="max-w-container mx-auto">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[42px] text-center font-medium text-text-light dark:text-text-dark leading-tight sm:leading-snug">
            Our mission is to provide access to quality out of school programs which support academic success, build
            confidence, and strengthen mental, social, and emotional well-being. We aim to inspire a lifelong love of
            learning as a core belief.
          </p>
        </div>
        <OutOfSchoolLearning />
      </div>
    </div>
  )
}
