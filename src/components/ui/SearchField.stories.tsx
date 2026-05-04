import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField } from './SearchField'

function ControlledSearchField() {
  const [value, setValue] = useState('')

  return (
    <SearchField label="Search" placeholder="Type to search..." value={value} onChange={setValue} />
  )
}

const meta: Meta<typeof ControlledSearchField> = {
  title: 'UI/SearchField',
  component: ControlledSearchField,
}

export default meta
type Story = StoryObj<typeof ControlledSearchField>

export const Default: Story = {}
