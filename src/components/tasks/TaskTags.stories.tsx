import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskTags } from './TaskTags '

const meta: Meta<typeof TaskTags> = {
  title: 'Tasks/TaskTags',
  component: TaskTags,
  args: {
    tags: ['frontend', 'release', 'urgent'],
  },
}

export default meta
type Story = StoryObj<typeof TaskTags>

export const Default: Story = {}
