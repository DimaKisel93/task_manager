import { Stack } from '@mui/material'
import type { ReactNode } from 'react'

interface PageHeaderActionsProps {
  left?: ReactNode
  right: ReactNode
}

export function PageHeaderActions({ left, right }: PageHeaderActionsProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1}>
        {left}
      </Stack>
      <Stack direction="row" spacing={1}>
        {right}
      </Stack>
    </Stack>
  )
}
