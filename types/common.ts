import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { LucideIcon } from 'lucide-react'

type ActionHandler = ActionCreatorWithoutPayload

export interface IActionItem {
  linkKey: string
  action: string
  label: string
  icon: LucideIcon
  open: ActionHandler
  formName: string
}
