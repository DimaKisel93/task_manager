import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TaskPriority, TaskStatus } from '../../types/task'
import { TasksFilters } from './TasksFilters'

function ControlledTasksFilters() {
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <TasksFilters
      search={search}
      selectedStatus={selectedStatus}
      selectedPriority={selectedPriority}
      selectedTag={selectedTag}
      tags={[
        { id: '1', name: 'frontend' },
        { id: '2', name: 'backend' },
      ]}
      onSearchChange={setSearch}
      onStatusChange={setSelectedStatus}
      onPriorityChange={setSelectedPriority}
      onTagChange={setSelectedTag}
    />
  )
}

const meta: Meta<typeof ControlledTasksFilters> = {
  title: 'Tasks/TasksFilters',
  component: ControlledTasksFilters,
}

export default meta
type Story = StoryObj<typeof ControlledTasksFilters>

export const Default: Story = {}
