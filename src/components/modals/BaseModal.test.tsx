import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BaseModal } from './BaseModal'

describe('BaseModal', () => {
  it('renders title, content and actions when open', () => {
    render(
      <BaseModal
        open
        title="Modal title"
        onClose={vi.fn()}
        content={<div>Modal content</div>}
        actions={<button type="button">Action</button>}
      />,
    )

    expect(screen.getByText('Modal title')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()

    render(
      <BaseModal
        open
        title="Modal title"
        onClose={onClose}
        content={<div>Modal content</div>}
        actions={<button type="button">Action</button>}
      />,
    )

    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
