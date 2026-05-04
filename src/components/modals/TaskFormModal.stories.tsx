import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from '../../app/store'
import { TaskFormModal } from './TaskFormModal'

const meta: Meta<typeof TaskFormModal> = {
  title: 'Modals/TaskFormModal',
  component: TaskFormModal,
  args: {
    open: true,
    onClose: () => undefined,
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
type Story = StoryObj<typeof TaskFormModal>

export const CreateMode: Story = {}

export const EditMode: Story = {
  args: {
    task: {
      id: 'task-story',
      title: 'Edit task title',
      description: 'Edit task description',
      status: 'inProgress',
      priority: 'high',
      deadline: '2026-05-30',
      tags: ['frontend', 'release'],
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-02T10:00:00.000Z',
    },
  },
}
