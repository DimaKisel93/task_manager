import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TasksSortBy, TasksSortOrder } from '../../types/tasksApi'
import { TasksSortBar } from './TasksSortBar'

function ControlledTasksSortBar() {
  const [sortBy, setSortBy] = useState<TasksSortBy | null>('createdAt')
  const [sortOrder, setSortOrder] = useState<TasksSortOrder>('asc')

  return (
    <TasksSortBar
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSortByChange={setSortBy}
      onSortOrderChange={setSortOrder}
    />
  )
}

const meta: Meta<typeof ControlledTasksSortBar> = {
  title: 'Tasks/TasksSortBar',
  component: ControlledTasksSortBar,
}

export default meta
type Story = StoryObj<typeof ControlledTasksSortBar>

export const Default: Story = {}
