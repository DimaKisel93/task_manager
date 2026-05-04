import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  TASKS_FILTER_SORT_BY_LABEL_TEXT,
  TASKS_FILTER_SORT_CREATED_AT_TEXT,
  TASKS_FILTER_SORT_DESC_TEXT,
} from '../../constants/tasks'
import { TasksSortBar } from './TasksSortBar'

describe('TasksSortBar', () => {
  it('calls onSortByChange when user picks sort field', () => {
    const onSortByChange = vi.fn()

    render(
      <TasksSortBar
        sortBy={null}
        sortOrder="asc"
        onSortByChange={onSortByChange}
        onSortOrderChange={vi.fn()}
      />,
    )

    fireEvent.mouseDown(screen.getByLabelText(TASKS_FILTER_SORT_BY_LABEL_TEXT))
    fireEvent.click(screen.getByRole('option', { name: TASKS_FILTER_SORT_CREATED_AT_TEXT }))

    expect(onSortByChange).toHaveBeenCalledWith('createdAt')
  })

  it('calls onSortOrderChange when order toggle is clicked', () => {
    const onSortOrderChange = vi.fn()

    render(
      <TasksSortBar
        sortBy="deadline"
        sortOrder="asc"
        onSortByChange={vi.fn()}
        onSortOrderChange={onSortOrderChange}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: TASKS_FILTER_SORT_DESC_TEXT }))

    expect(onSortOrderChange).toHaveBeenCalledWith('desc')
  })
})
