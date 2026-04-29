import { TASK_STATUS_DONE } from '../constants/tasks'
import type { Task } from '../types/task'
import {
  priorityMap,
  statusMap,
  TASKS_FILTER_SORT_ASC_TEXT,
  TASKS_FILTER_SORT_CREATED_AT_TEXT,
  TASKS_FILTER_SORT_DEADLINE_TEXT,
  TASKS_FILTER_SORT_DESC_TEXT,
} from '../constants/tasks'
import type { ActiveFiltersParams } from '../types/task'

export function isTaskOverdue(task: Task, now = new Date()): boolean {
  if (task.status === TASK_STATUS_DONE) {
    return false
  }

  const deadlineDate = new Date(task.deadline)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)

  return deadlineDate < today
}

export const buildActiveFilters = ({
  search,
  sortBy,
  sortOrder,
  tag,
  status,
  priority,
}: ActiveFiltersParams): string[] => {
  const result: string[] = []

  if (search) {
    result.push(`Search: ${search}`)
  }

  if (sortBy) {
    const sortByLabel =
      sortBy === 'createdAt' ? TASKS_FILTER_SORT_CREATED_AT_TEXT : TASKS_FILTER_SORT_DEADLINE_TEXT
    const orderLabel = sortOrder === 'asc' ? TASKS_FILTER_SORT_ASC_TEXT : TASKS_FILTER_SORT_DESC_TEXT

    result.push(`Sort: ${sortByLabel} (${orderLabel})`)
  }

  if (tag) {
    result.push(`Tag: ${tag}`)
  }

  if (status) {
    result.push(`Status: ${statusMap[status].label}`)
  }

  if (priority) {
    result.push(`Priority: ${priorityMap[priority].label}`)
  }

  return result
}
