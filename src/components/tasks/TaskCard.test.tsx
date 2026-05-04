import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Task } from '../../types/task'
import { TaskCard } from './TaskCard'

const navigateMock = vi.fn()
const unwrapMock = vi.fn().mockResolvedValue(undefined)
const updateTaskStatusMock = vi.fn(() => ({ unwrap: unwrapMock }))

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}))

vi.mock('../../services/tasksApi', () => ({
  useUpdateTaskStatusMutation: () => [updateTaskStatusMock, { isLoading: false }],
}))

describe('TaskCard', () => {
  const task: Task = {
    id: '1',
    title: 'Task title',
    description: 'Task description',
    status: 'todo',
    priority: 'medium',
    deadline: '2026-05-30',
    tags: ['frontend'],
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-02T11:00:00.000Z',
  }

  beforeEach(() => {
    navigateMock.mockClear()
    updateTaskStatusMock.mockClear()
    unwrapMock.mockClear()
  })

  it('navigates to details page on card click', () => {
    render(<TaskCard task={task} />)

    fireEvent.click(screen.getByText('Task title'))
    expect(navigateMock).toHaveBeenCalledWith('/task/1')
  })

  it('calls onTagClick when tag chip clicked', () => {
    const onTagClick = vi.fn()
    render(<TaskCard task={task} onTagClick={onTagClick} />)

    fireEvent.click(screen.getByRole('button', { name: 'frontend' }))
    expect(onTagClick).toHaveBeenCalledWith('frontend')
  })
})
