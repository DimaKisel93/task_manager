import type { Task, TaskPriority, TaskStatus } from '../types/task'

export interface GetTasksParams {
  page: number
  limit: number
  search?: string
  tag?: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}
