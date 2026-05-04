import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Tasks/StatusBadge',
  component: StatusBadge,
  args: {
    status: 'inProgress',
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {}
