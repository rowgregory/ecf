import { Shield } from 'lucide-react'
import { setOpenUserDrawer } from '../store/slices/uiSlice'
import { IActionItem } from '@/types/common'

export const dropDownActionItems: IActionItem[] = [
  {
    action: 'create-admin',
    label: 'Create Admin',
    icon: Shield,
    open: setOpenUserDrawer,
    linkKey: '/admin/users/overview',
    formName: 'userForm'
  }
]
