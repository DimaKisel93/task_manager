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
  tag: string | null
  status: TaskStatus | ''
  priority: TaskPriority | ''
}
