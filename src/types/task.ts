export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'inProgress' | 'done'
  priority: 'low' | 'medium' | 'high'
  deadline: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
}
