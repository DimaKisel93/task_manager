import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DeleteTaskConfirmModal } from './DeleteTaskConfirmModal'

describe('DeleteTaskConfirmModal', () => {
  it('renders confirmation text with task title', () => {
    render(
      <DeleteTaskConfirmModal
        open
        taskTitle="My task"
        isDeleting={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )

    expect(screen.getByText(/My task/)).toBeInTheDocument()
  })

  it('fires handlers for cancel and confirm buttons', () => {
    const onClose = vi.fn()
    const onConfirm = vi.fn()

    render(
      <DeleteTaskConfirmModal
        open
        taskTitle="My task"
        isDeleting={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onClose).toHaveBeenCalled()
    expect(onConfirm).toHaveBeenCalled()
  })
})
