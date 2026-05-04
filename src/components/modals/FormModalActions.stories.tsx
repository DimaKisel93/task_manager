import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormModalActions } from './FormModalActions'

const meta: Meta<typeof FormModalActions> = {
  title: 'Modals/FormModalActions',
  component: FormModalActions,
  args: {
    cancelText: 'Cancel',
    submitText: 'Save',
    onCancel: () => undefined,
    onConfirm: () => undefined,
    isSubmitting: false,
  },
}

export default meta
type Story = StoryObj<typeof FormModalActions>

export const ConfirmButtons: Story = {}
