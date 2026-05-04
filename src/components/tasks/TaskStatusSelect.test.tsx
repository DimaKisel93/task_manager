import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TASK_CARD_STATUS_LABEL_TEXT, STATUS_MAP } from '../../constants/tasks'
import { TaskStatusSelect } from './TaskStatusSelect'

describe('TaskStatusSelect', () => {
  it('renders current status value', () => {
    render(<TaskStatusSelect status="todo" disabled={false} onStatusChange={vi.fn()} />)

    expect(screen.getByRole('combobox', { name: TASK_CARD_STATUS_LABEL_TEXT })).toBeInTheDocument()
  })

  it('calls onStatusChange with selected status', () => {
    const onStatusChange = vi.fn()

    render(<TaskStatusSelect status="todo" disabled={false} onStatusChange={onStatusChange} />)

    fireEvent.mouseDown(screen.getByRole('combobox', { name: TASK_CARD_STATUS_LABEL_TEXT }))
    fireEvent.click(screen.getByRole('option', { name: STATUS_MAP.done.label }))

    expect(onStatusChange).toHaveBeenCalledWith('done')
  })
})
