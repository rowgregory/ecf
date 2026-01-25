import { closeVideoLightbox, openVideoLightbox, toggleMobileMenu } from '../store/slices/uiSlice'
import { useAppDispatch } from '../store/store'

export const useUI = () => {
  const dispatch = useAppDispatch()

  return {
    openVideoLightbox: (url: string) => dispatch(openVideoLightbox(url)),
    closeVideoLightbox: () => dispatch(closeVideoLightbox()),
    toggleMobileMenu: () => dispatch(toggleMobileMenu())
  }
}
