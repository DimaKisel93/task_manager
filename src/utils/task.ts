import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { TASK_STATUS_DONE } from '../constants/tasks'
import type { Task } from '../types/task'

export function isTaskOverdue(task: Task, now = new Date()): boolean {
  if (task.status === TASK_STATUS_DONE) {
    return false
  }

  const deadlineDate = new Date(task.deadline)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)

  return deadlineDate < today
}

export const extractTotalCount = (
  meta: FetchBaseQueryMeta | undefined,
  fallbackLength: number,
): number => {
  const totalFromHeader = Number(meta?.response?.headers.get('X-Total-Count'))
  const total = Number.isNaN(totalFromHeader) ? fallbackLength : totalFromHeader
  return total
}
