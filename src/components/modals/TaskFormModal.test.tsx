import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  TASK_FORM_CANCEL_TEXT,
  TASK_FORM_CREATE_TITLE_TEXT,
  TASK_FORM_EDIT_TITLE_TEXT,
} from '../../constants/tasks'
import { TaskFormModal } from './TaskFormModal'

vi.mock('../../services/tasksApi', () => ({
  useGetTagsQuery: () => ({ data: [{ id: '1', name: 'frontend' }] }),
  useCreateTaskMutation: () => [vi.fn(), { isLoading: false, isError: false }],
  useUpdateTaskMutation: () => [vi.fn(), { isLoading: false, isError: false }],
}))

describe('TaskFormModal', () => {
  it('renders create mode title', () => {
    render(<TaskFormModal open onClose={vi.fn()} />)
    expect(screen.getByText(TASK_FORM_CREATE_TITLE_TEXT)).toBeInTheDocument()
  })

  it('renders edit mode title', () => {
    render(
      <TaskFormModal
        open
        task={{
          id: '1',
          title: 'Edit task',
          description: 'Desc',
          status: 'todo',
          priority: 'medium',
          deadline: '2026-05-10',
          tags: ['frontend'],
          createdAt: '2026-05-01T10:00:00.000Z',
          updatedAt: '2026-05-02T10:00:00.000Z',
        }}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText(TASK_FORM_EDIT_TITLE_TEXT)).toBeInTheDocument()
  })

  it('calls onClose when cancel clicked', () => {
    const onClose = vi.fn()
    render(<TaskFormModal open onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: TASK_FORM_CANCEL_TEXT }))
    expect(onClose).toHaveBeenCalled()
  })
})
