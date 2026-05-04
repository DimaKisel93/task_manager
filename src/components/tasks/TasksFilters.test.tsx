import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  TASKS_FILTER_SEARCH_LABEL_TEXT,
  TASKS_FILTER_TAG_LABEL_TEXT,
  TASKS_FILTER_ALL_OPTION_TEXT,
} from '../../constants/tasks'
import { TasksFilters } from './TasksFilters'

describe('TasksFilters', () => {
  it('calls onSearchChange when user types in search', () => {
    const onSearchChange = vi.fn()

    render(
      <TasksFilters
        search=""
        selectedStatus={null}
        selectedPriority={null}
        selectedTag={null}
        tags={[]}
        onSearchChange={onSearchChange}
        onStatusChange={vi.fn()}
        onPriorityChange={vi.fn()}
        onTagChange={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText(TASKS_FILTER_SEARCH_LABEL_TEXT), {
      target: { value: 'deploy' },
    })

    expect(onSearchChange).toHaveBeenCalledWith('deploy')
  })

  it('calls onTagChange with null when "All" is selected', () => {
    const onTagChange = vi.fn()

    render(
      <TasksFilters
        search=""
        selectedStatus={null}
        selectedPriority={null}
        selectedTag="frontend"
        tags={[{ id: '1', name: 'frontend' }]}
        onSearchChange={vi.fn()}
        onStatusChange={vi.fn()}
        onPriorityChange={vi.fn()}
        onTagChange={onTagChange}
      />,
    )

    fireEvent.mouseDown(screen.getByLabelText(TASKS_FILTER_TAG_LABEL_TEXT))
    fireEvent.click(screen.getByRole('option', { name: TASKS_FILTER_ALL_OPTION_TEXT }))

    expect(onTagChange).toHaveBeenCalledWith(null)
  })
})
