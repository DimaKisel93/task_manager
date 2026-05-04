import { Chip } from '@mui/material'
import { STATUS_MAP } from '../../constants/tasks'
import type { TaskStatus } from '../../types/task'

interface StatusBadgeProps {
  status: TaskStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Chip label={STATUS_MAP[status].label} color={STATUS_MAP[status].color} />
}
