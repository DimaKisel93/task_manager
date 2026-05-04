import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteTaskConfirmModal } from './DeleteTaskConfirmModal'

const meta: Meta<typeof DeleteTaskConfirmModal> = {
  title: 'Modals/DeleteTaskConfirmModal',
  component: DeleteTaskConfirmModal,
  args: {
    open: true,
    taskTitle: 'Prepare release notes',
    isDeleting: false,
    onClose: () => undefined,
    onConfirm: () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof DeleteTaskConfirmModal>

export const Default: Story = {}
