import { Shield } from 'lucide-react'
import { setOpenCreateAdminModal } from '../store/slices/uiSlice'
import { IActionItem } from '@/types/common'

export const dropDownActionItems: IActionItem[] = [
  {
    action: 'create-admin',
    label: 'Create Admin',
    icon: Shield,
    open: setOpenCreateAdminModal,
    linkKey: '/admin/users/overview',
    formName: 'userForm'
  }
]
