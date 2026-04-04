import { Hero } from './components/Hero'
import OutOfSchoolLearning from './components/home/OutOfSchoolLearning'
import ByTheNumbers from './components/home/ByTheNumbers'
import MarqueeSponsors from './components/MarqueeSponsors'
import RealStories from './components/home/RealStories'
import OurHistory from './components/home/OurHistory'
import LogoIconLight from '@/public/svg/LogoIconLight'
import LogoIconDark from '@/public/svg/LogoIconDark'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <MarqueeSponsors />

      {/* Mission statement */}
      <section
        aria-label="Our mission"
        className="py-24 xs:py-30 px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32 w-full border-b border-border-subtle dark:border-border-dark"
      >
        <div className="max-w-5xl mx-auto">
          <div className="w-12 mb-8 xs:mb-10">
            <LogoIconLight />
            <LogoIconDark />
          </div>
          <div className="flex gap-6 xs:gap-8 items-start">
            {/* Dot column */}
            <div aria-hidden="true" className="flex flex-col gap-2 pt-1.5 shrink-0">
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-50" />
              <div className="w-2 h-2 bg-primary-light dark:bg-primary-dark opacity-20" />
            </div>

            <p className="font-mono text-base xs:text-lg sm:text-xl text-text-light/70 dark:text-text-dark/60 leading-relaxed tracking-wide">
              Our mission is to provide access to quality out of school programs which support academic success, build
              confidence, and strengthen mental, social, and emotional well-being. We aim to inspire a lifelong love of
              learning as a core belief.
            </p>
          </div>
        </div>
      </section>

      <OutOfSchoolLearning />
      <ByTheNumbers />
      <RealStories />
      <OurHistory />
    </div>
  )
}
