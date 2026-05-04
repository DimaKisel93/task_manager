import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TaskStatus } from '../../types/task'
import { TaskStatusSelect } from './TaskStatusSelect'

function ControlledTaskStatusSelect() {
  const [status, setStatus] = useState<TaskStatus>('todo')

  return <TaskStatusSelect status={status} disabled={false} onStatusChange={setStatus} />
}

const meta: Meta<typeof ControlledTaskStatusSelect> = {
  title: 'Tasks/TaskStatusSelect',
  component: ControlledTaskStatusSelect,
}

export default meta
type Story = StoryObj<typeof ControlledTaskStatusSelect>

export const Default: Story = {}
