// BaseModal.tsx
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { ReactNode } from 'react'

interface BaseModalProps {
  open: boolean
  title: string
  onClose: () => void
  content: ReactNode
  actions: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullWidth?: boolean
  disableEscapeKeyDown?: boolean
  sx?: SxProps<Theme>
}

export function BaseModal({
  open,
  title,
  onClose,
  content,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableEscapeKeyDown = false,
  sx,
}: BaseModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableEscapeKeyDown={disableEscapeKeyDown}
      sx={sx}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
