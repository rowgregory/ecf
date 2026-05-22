import { FC } from 'react'
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/app/components/ui/icons'

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100085459788868'
export const INSTAGRAM_URL = 'https://www.instagram.com/educationcomes1st/'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/educationcomesfirst'

interface SocialMediaLink {
  label: string
  href: string
  icon: FC
}

export const SOCIAL_MEDIA_DATA: SocialMediaLink[] = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: FacebookIcon },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: LinkedInIcon }
]

export const sponsorImages = [
  '/images/sponsor-1.png',
  '/images/sponsor-2.png',
  '/images/sponsor-3.png',
  '/images/sponsor-4.png',
  '/images/sponsor-5.png',
  '/images/sponsor-6.png',
  '/images/sponsor-7.png',
  '/images/sponsor-8.png',
  '/images/sponsor-9.png',
  '/images/sponsor-10.png',
  '/images/sponsor-11.png',
  '/images/sponsor-12.png',
  '/images/sponsor-13.png',
  '/images/sponsor-14.png',
  '/images/sponsor-15.png',
  '/images/sponsor-16.png',
  '/images/sponsor-17.png',
  '/images/sponsor-18.png',
  '/images/sponsor-19.png',
  '/images/sponsor-20.png',
  '/images/sponsor-21.png',
  '/images/sponsor-22.png',
  '/images/sponsor-23.png',
  '/images/sponsor-24.png',
  '/images/sponsor-25.png'
]
