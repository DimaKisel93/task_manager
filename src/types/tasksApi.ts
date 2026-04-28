import type { Task } from '../types/task'

export interface GetTasksParams {
  page: number
  limit: number
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}

export interface JsonServerPaginatedResponse {
  data: Task[]
  items: number
}
