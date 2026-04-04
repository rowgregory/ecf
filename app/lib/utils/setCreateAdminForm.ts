import { setInputs } from '../store/slices/formSlice'
import { store } from '../store/store'

export const setCreateAdminForm = (data: Record<string, any>) =>
  store.dispatch(setInputs({ formName: 'createAdminForm', data }))
