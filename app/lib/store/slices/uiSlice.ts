import { createSlice, Reducer } from '@reduxjs/toolkit'

const uiInitialState = {
  videoLightbox: false,
  videoUrl: null,
  mobileMenuOpen: false,
  sidebarOpen: false,
  notificationOpen: false
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
    }
  }
})

export const uiReducer = uiSlice.reducer as Reducer

export const { closeVideoLightbox, openVideoLightbox, toggleMobileMenu } = uiSlice.actions
