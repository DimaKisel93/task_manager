import { Chip } from '@mui/material'
import { TASK_CARD_PRIORITY_PREFIX_TEXT, PRIORITY_MAP } from '../../constants/tasks'
import type { TaskPriority } from '../../types/task'

interface PriorityBadgeProps {
  priority: TaskPriority
  withPrefix?: boolean
}

export function PriorityBadge({ priority, withPrefix = true }: PriorityBadgeProps) {
  const label = withPrefix
    ? `${TASK_CARD_PRIORITY_PREFIX_TEXT} ${PRIORITY_MAP[priority].label}`
    : PRIORITY_MAP[priority].label

  return <Chip label={label} color={PRIORITY_MAP[priority].color} />
}
