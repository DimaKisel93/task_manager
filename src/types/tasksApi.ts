import type { Task, TaskPriority, TaskStatus } from '../types/task'

export type TasksSortBy = 'createdAt' | 'deadline'
export type TasksSortOrder = 'asc' | 'desc'

export interface GetTasksParams {
  page: number
  limit: number
  search?: string
  sortBy?: TasksSortBy
  sortOrder?: TasksSortOrder
  tag?: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}
