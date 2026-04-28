import type { Task } from '../types/task'

export interface GetTasksParams {
  page: number
  limit: number
  tag?: string
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}
