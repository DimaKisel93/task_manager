import type { TaskStatus, TaskPriority } from '../types/task'

export const statusMap: Record<
  TaskStatus,
  { label: string; color: 'default' | 'warning' | 'success' }
> = {
  todo: { label: 'To Do', color: 'default' },
  inProgress: { label: 'In Progress', color: 'warning' },
  done: { label: 'Done', color: 'success' },
}

export const priorityMap: Record<
  TaskPriority,
  { label: string; color: 'success' | 'warning' | 'error' }
> = {
  low: { label: 'Low', color: 'success' },
  medium: { label: 'Medium', color: 'warning' },
  high: { label: 'High', color: 'error' },
}

export const PAGE_SIZE = 5
