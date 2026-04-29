export type TaskStatus = 'todo' | 'inProgress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  deadline: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
}

export interface ActiveFiltersParams {
  search: string
  sortBy: null | 'createdAt' | 'deadline'
  sortOrder: 'asc' | 'desc'
  tag: string | null
  status: TaskStatus | null
  priority: TaskPriority | null
}
