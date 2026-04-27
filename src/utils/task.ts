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
