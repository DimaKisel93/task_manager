import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from '../../app/store'
import type { Task } from '../../types/task'
import { TaskCard } from './TaskCard'

const sampleTask: Task = {
  id: 'story-1',
  title: 'Prepare release notes',
  description: 'Finalize changelog and send release summary to the team.',
  status: 'inProgress',
  priority: 'high',
  deadline: '2026-05-20',
  tags: ['release', 'documentation'],
  createdAt: '2026-05-01T09:00:00.000Z',
  updatedAt: '2026-05-04T08:00:00.000Z',
}

const meta: Meta<typeof TaskCard> = {
  title: 'Tasks/TaskCard',
  component: TaskCard,
  args: {
    task: sampleTask,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TaskCard>

export const Default: Story = {}

export const Overdue: Story = {
  args: {
    task: {
      ...sampleTask,
      deadline: '2026-04-01',
      status: 'todo',
    },
  },
}
