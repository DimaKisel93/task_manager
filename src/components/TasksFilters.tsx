import { MenuItem, Stack, TextField } from '@mui/material'
import {
  TASKS_FILTER_ALL_OPTION_TEXT,
  TASKS_FILTER_PRIORITY_LABEL_TEXT,
  TASKS_FILTER_SEARCH_LABEL_TEXT,
  TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT,
  TASKS_FILTER_STATUS_LABEL_TEXT,
  TASKS_FILTER_TAG_LABEL_TEXT,
  priorityMap,
  statusMap,
} from '../constants/tasks'
import type { Tag, TaskPriority, TaskStatus } from '../types/task'

interface TasksFiltersProps {
  search: string
  selectedStatus: TaskStatus | ''
  selectedPriority: TaskPriority | ''
  selectedTag: string | null
  tags: Tag[]
  onSearchChange: (search: string) => void
  onStatusChange: (status: TaskStatus | '') => void
  onPriorityChange: (priority: TaskPriority | '') => void
  onTagChange: (tag: string | null) => void
}

export function TasksFilters({
  search,
  selectedStatus,
  selectedPriority,
  selectedTag,
  tags,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTagChange,
}: TasksFiltersProps) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <TextField
        label={TASKS_FILTER_SEARCH_LABEL_TEXT}
        placeholder={TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ minWidth: 240 }}
      />

      <TextField
        select
        label={TASKS_FILTER_STATUS_LABEL_TEXT}
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value as TaskStatus | '')}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">{TASKS_FILTER_ALL_OPTION_TEXT}</MenuItem>
        <MenuItem value="todo">{statusMap.todo.label}</MenuItem>
        <MenuItem value="inProgress">{statusMap.inProgress.label}</MenuItem>
        <MenuItem value="done">{statusMap.done.label}</MenuItem>
      </TextField>

      <TextField
        select
        label={TASKS_FILTER_PRIORITY_LABEL_TEXT}
        value={selectedPriority}
        onChange={(event) => onPriorityChange(event.target.value as TaskPriority | '')}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">{TASKS_FILTER_ALL_OPTION_TEXT}</MenuItem>
        <MenuItem value="low">{priorityMap.low.label}</MenuItem>
        <MenuItem value="medium">{priorityMap.medium.label}</MenuItem>
        <MenuItem value="high">{priorityMap.high.label}</MenuItem>
      </TextField>

      <TextField
        select
        label={TASKS_FILTER_TAG_LABEL_TEXT}
        value={selectedTag ?? ''}
        onChange={(event) => onTagChange(event.target.value || null)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">{TASKS_FILTER_ALL_OPTION_TEXT}</MenuItem>
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.name}>
            {tag.name}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}
