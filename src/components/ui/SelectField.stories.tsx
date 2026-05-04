import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectField } from './SelectField'

function ControlledSelectField() {
  const [value, setValue] = useState('inProgress')

  return (
    <SelectField
      label="Status"
      value={value}
      onChange={setValue}
      options={[
        { value: 'todo', label: 'To Do' },
        { value: 'inProgress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
      ]}
      sx={{ minWidth: 220 }}
    />
  )
}

const meta: Meta<typeof ControlledSelectField> = {
  title: 'UI/SelectField',
  component: ControlledSelectField,
}

export default meta
type Story = StoryObj<typeof ControlledSelectField>

export const Default: Story = {}
