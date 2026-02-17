import Link from 'next/link'
import Picture from './common/Picture'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import RightArrow from '@/public/svg/RightArrow'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Dropdown from './Dropdown'

const Header = () => {
  const pathname = usePathname()

  const headerNavLinks = [
    { textKey: 'Home', linkKey: '/', isActive: pathname === '/' },
    { textKey: 'About', linkKey: '/about', isActive: pathname === '/about' },
    { textKey: 'Impact', linkKey: '/impact', isActive: pathname === '/impact' },
    { textKey: 'Advocates', linkKey: '/advocates', isActive: pathname === '/advocates' },
    { textKey: 'Contact', linkKey: '/contact', isActive: pathname === '/contact' },
    { textKey: 'Get Involved', linkKey: '/get-involved', isActive: pathname === '/get-involved' }
  ]

  return (
    <header className="bg-accent dark:bg-black sticky top-0 z-20 py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-6 border-b border-b-border-light dark:border-b-border-dark xl:before:absolute xl:before:left-68 xl:before:top-0 xl:before:w-px xl:before:h-[102.31px] xl:before:content-[''] xl:before:bg-border-light  xl:after:absolute xl:after:right-70 xl:after:top-0 xl:after:w-px xl:after:h-[102.31px] xl:after:content-[''] xl:after:bg-border-light xl:dark:before:absolute xl:dark:before:left-68 xl:dark:before:top-0 xl:dark:before:w-px xl:dark:before:h-[102.31px] xl:dark:before:content-[''] xl:dark:before:bg-border-dark  xl:dark:after:absolute xl:dark:after:right-70 xl:dark:after:top-0 xl:dark:after:w-px xl:dark:after:h-[102.31px] xl:dark:after:content-[''] xl:dark:after:bg-border-dark">
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <Link href="/" className="">
          <div className="w-32 sm:w-40 md:w-48 lg:w-52">
            <Picture
              src="/svg/logo-horizontal-light.svg"
              alt="Education Comes First"
              className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
              priority={true}
            />
            <LogoHorizontalDark />
          </div>
        </Link>
        <nav className="hidden 1150:flex items-center gap-x-4 1150:gap-x-8">
          {headerNavLinks.map((obj, i) => (
            <div
              key={i}
              className={`${obj.isActive ? 'dark:text-secondary-dark text-secondary-light' : ''} font-kanit font-medium uppercase text-xs sm:text-sm md:text-base dark:hover:text-primary-dark hover:text-sky-500 duration-200`}
            >
              <Link href={obj.linkKey}>{obj.textKey}</Link>
            </div>
          ))}
          <Dropdown
            trigger="Programs"
            items={[
              { label: 'Youth Development', linkKey: '/programs/youth' },
              { label: 'Sports', linkKey: '/programs/sports', isActive: true },
              { label: 'Arts', linkKey: '/programs/arts' }
            ]}
          />
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/donate"
            className={`hidden sm:flex w-fit px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-[5px] text-neutral-950 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2 font-kanit text-sm md:text-lg cursor-pointer bg-primary-light dark:bg-primary-dark hover:opacity-90`}
          >
            Donate
            <RightArrow />
          </Link>
          <button className="p-2 sm:p-2.5 md:p-3.5 bg-bg-dark dark:bg-bg-light rounded-[5px] hover:opacity-80 transition-opacity shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <Menu className="text-text-dark dark:text-text-light w-full h-full" strokeWidth={1} />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
