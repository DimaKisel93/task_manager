import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppButton } from '../ui'
import { PageHeaderActions } from './PageHeaderActions'

const meta: Meta<typeof PageHeaderActions> = {
  title: 'Layout/PageHeaderActions',
  component: PageHeaderActions,
}

export default meta
type Story = StoryObj<typeof PageHeaderActions>

export const Default: Story = {
  args: {
    left: <AppButton variant="outlined">Back</AppButton>,
    right: (
      <>
        <AppButton variant="contained">Edit</AppButton>
        <AppButton variant="contained" color="error">
          Delete
        </AppButton>
      </>
    ),
  },
}
