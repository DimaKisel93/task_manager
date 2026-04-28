import type { Task, TaskPriority, TaskStatus } from '../types/task'

export interface GetTasksParams {
  page: number
  limit: number
  tag?: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}
