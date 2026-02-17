import { Satellite, Shield } from 'lucide-react'
import { setOpenCampaignDrawer, setOpenUserDrawer } from '../store/slices/uiSlice'
import { IActionItem } from '@/types/common'

export const dropDownActionItems: IActionItem[] = [
  {
    action: 'create-campaign',
    label: 'Initiate Campaign',
    icon: Satellite,
    open: setOpenCampaignDrawer,
    linkKey: '/admin/donations/overview',
    formName: 'campaignDrawer'
  },
  {
    action: 'create-admin',
    label: 'Create Admin',
    icon: Shield,
    open: setOpenUserDrawer,
    linkKey: '/admin/users/overview',
    formName: 'userForm'
  }
]
