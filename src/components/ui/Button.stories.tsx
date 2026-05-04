import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppButton } from './Button'

const meta: Meta<typeof AppButton> = {
  title: 'UI/Button',
  component: AppButton,
  args: {
    children: 'Action',
    variant: 'contained',
  },
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Primary: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outlined',
  },
}
