import { Chip, Stack } from '@mui/material'

interface TaskTagsProps {
  tags: string[]
  onTagClick?: (tag: string) => void
}

export function TaskTags({ tags, onTagClick }: TaskTagsProps) {
  if (tags.length === 0) return null

  const handleTagClick = (tag: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    onTagClick?.(tag)
  }

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size="small"
          clickable={Boolean(onTagClick)}
          onClick={handleTagClick(tag)}
        />
      ))}
    </Stack>
  )
}
