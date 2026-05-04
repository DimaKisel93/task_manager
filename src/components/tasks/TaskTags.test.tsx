import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TaskTags } from './TaskTags '

describe('TaskTags', () => {
  it('renders nothing when tags are empty', () => {
    const { container } = render(<TaskTags tags={[]} onTagClick={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders tags and calls onTagClick', () => {
    const onTagClick = vi.fn()

    render(<TaskTags tags={['frontend', 'api']} onTagClick={onTagClick} />)

    fireEvent.click(screen.getByRole('button', { name: 'frontend' }))
    expect(onTagClick).toHaveBeenCalledWith('frontend')
  })
})
