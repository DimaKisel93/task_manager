import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@mui/material'
import { BaseModal } from './BaseModal'

const meta: Meta<typeof BaseModal> = {
  title: 'Modals/BaseModal',
  component: BaseModal,
  args: {
    open: true,
    title: 'Base modal title',
    onClose: () => undefined,
    content: <Typography>Base modal content</Typography>,
    actions: <Button variant="contained">Confirm</Button>,
  },
}

export default meta
type Story = StoryObj<typeof BaseModal>

export const Default: Story = {}
