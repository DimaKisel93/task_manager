import { TASK_STATUS_DONE } from '../constants/tasks'
import type { Task } from '../types/task'
import {
  PRIORITY_MAP,
  STATUS_MAP,
  TASKS_FILTER_SORT_ASC_TEXT,
  TASKS_FILTER_SORT_CREATED_AT_TEXT,
  TASKS_FILTER_SORT_DEADLINE_TEXT,
  TASKS_FILTER_SORT_DESC_TEXT,
} from '../constants/tasks'
import type { ActiveFiltersParams } from '../types/task'
import type { TaskFormValues } from '../schemas/taskFormSchema'

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
    const orderLabel =
      sortOrder === 'asc' ? TASKS_FILTER_SORT_ASC_TEXT : TASKS_FILTER_SORT_DESC_TEXT

    result.push(`Sort: ${sortByLabel} (${orderLabel})`)
  }

  if (tag) {
    result.push(`Tag: ${tag}`)
  }

  if (status) {
    result.push(`Status: ${STATUS_MAP[status].label}`)
  }

  if (priority) {
    result.push(`Priority: ${PRIORITY_MAP[priority].label}`)
  }

  return result
}

export function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const t of tags) {
    const s = t.trim()
    if (!s || seen.has(s)) continue
    seen.add(s)
    out.push(s)
  }
  return out
}

function deadlineForInput(deadline: string): string {
  const d = deadline.slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : ''
}

export function defaultValues(task?: Task | null): TaskFormValues {
  if (!task) {
    return {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      deadline: '',
      tags: [],
    }
  }
  return {
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    deadline: deadlineForInput(task.deadline),
    tags: [...task.tags],
  }
}
