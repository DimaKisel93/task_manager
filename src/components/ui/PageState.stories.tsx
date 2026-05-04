import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState, ErrorState, LoadingState } from './PageState'

const meta: Meta = {
  title: 'UI/PageState',
}

export default meta
type Story = StoryObj

export const Loading: Story = {
  render: () => <LoadingState />,
}

export const Error: Story = {
  render: () => <ErrorState message="Something went wrong." />,
}

export const Empty: Story = {
  render: () => <EmptyState message="No items found." />,
}
