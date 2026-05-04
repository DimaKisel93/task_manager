import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriorityBadge } from './PriorityBadge'

const meta: Meta<typeof PriorityBadge> = {
  title: 'Tasks/PriorityBadge',
  component: PriorityBadge,
  args: {
    priority: 'medium',
    withPrefix: true,
  },
}

export default meta
type Story = StoryObj<typeof PriorityBadge>

export const Default: Story = {}
