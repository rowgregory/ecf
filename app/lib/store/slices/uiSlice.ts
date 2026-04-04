import { createSlice, Reducer } from '@reduxjs/toolkit'

const uiInitialState = {
  videoLightbox: false,
  videoUrl: null,
  mobileMenuOpen: false,
  sidebarOpen: false,
  notificationOpen: false,
  adminSidebar: false,
  adminActionMenu: false,
  userDrawer: false,
  mobileNavigation: false,
  isLoading: false,
  isDark: false,
  contactDrawer: false,
  contactSubmissionSuccessModal: false,
  paymentMethodDrawer: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    openVideoLightbox: (state, { payload }) => {
      state.videoLightbox = true
      state.videoUrl = payload
    },
    closeVideoLightbox: (state) => {
      state.videoLightbox = false
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setOpenAdminSidebar: (state) => {
      state.adminSidebar = true
    },
    setCloseAdminSidebar: (state) => {
      state.adminSidebar = false
    },
    setToggleAdminSidebar: (state, { payload }) => {
      state.adminSidebar = !payload
    },
    setOpenAdminActionMenu: (state) => {
      state.adminActionMenu = true
    },
    setCloseAdminActionMenu: (state) => {
      state.adminActionMenu = false
    },
    setOpenContactDrawer: (state) => {
      state.contactDrawer = true
    },
    setCloseContactDrawer: (state) => {
      state.contactDrawer = false
    },
    setOpenUserDrawer: (state) => {
      state.userDrawer = true
    },
    setCloseUserDrawer: (state) => {
      state.userDrawer = false
    },
    setOpenMobileNavigation: (state) => {
      state.mobileNavigation = true
    },
    setCloseMobileNavigation: (state) => {
      state.mobileNavigation = false
    },
    setIsLoading: (state) => {
      state.isLoading = true
    },
    setIsNotLoading: (state) => {
      state.isLoading = false
    },
    setIsDark: (state, { payload }) => {
      state.isDark = payload
    },
    setOpenContactSubmissionSuccessModal: (state) => {
      state.contactSubmissionSuccessModal = true
    },
    setCloseContactSubmissionSuccessModal: (state) => {
      state.contactSubmissionSuccessModal = false
    },
    setOpenPaymentMethodDrawer: (state) => {
      state.paymentMethodDrawer = true
    },
    setClosePaymentMethodDrawer: (state) => {
      state.paymentMethodDrawer = false
    }
  }
})

export const uiReducer = uiSlice.reducer as Reducer

export const {
  closeVideoLightbox,
  openVideoLightbox,
  toggleMobileMenu,
  setCloseAdminSidebar,
  setOpenAdminSidebar,
  setCloseAdminActionMenu,
  setOpenAdminActionMenu,
  setCloseContactDrawer,
  setOpenContactDrawer,
  setCloseUserDrawer,
  setOpenUserDrawer,
  setToggleAdminSidebar,
  setCloseMobileNavigation,
  setOpenMobileNavigation,
  setIsLoading,
  setIsNotLoading,
  setOpenContactSubmissionSuccessModal,
  setCloseContactSubmissionSuccessModal,
  setClosePaymentMethodDrawer,
  setIsDark,
  setOpenPaymentMethodDrawer
} = uiSlice.actions
