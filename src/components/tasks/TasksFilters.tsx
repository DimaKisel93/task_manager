import { Stack } from '@mui/material'
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TASKS_FILTER_ALL_OPTION_TEXT,
  TASKS_FILTER_PRIORITY_LABEL_TEXT,
  TASKS_FILTER_SEARCH_LABEL_TEXT,
  TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT,
  TASKS_FILTER_STATUS_LABEL_TEXT,
  TASKS_FILTER_TAG_LABEL_TEXT,
} from '../../constants/tasks'
import { tasksFiltersStyles } from '../../constants/styles'
import type { Tag, TaskPriority, TaskStatus } from '../../types/task'
import { fromSelectValue, toSelectValue } from '../../utils/helpers'
import { SearchField, SelectField } from '../ui'
import { useMemo } from 'react'

interface TasksFiltersProps {
  search: string
  selectedStatus: TaskStatus | null
  selectedPriority: TaskPriority | null
  selectedTag: string | null
  tags: Tag[]
  onSearchChange: (search: string) => void
  onStatusChange: (status: TaskStatus | null) => void
  onPriorityChange: (priority: TaskPriority | null) => void
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
  const tagOptions = useMemo(
    () => [
      { value: '', label: TASKS_FILTER_ALL_OPTION_TEXT },
      ...tags.map((tag) => ({ value: tag.name, label: tag.name })),
    ],
    [tags],
  )
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <SearchField
        label={TASKS_FILTER_SEARCH_LABEL_TEXT}
        placeholder={TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT}
        value={search}
        onChange={onSearchChange}
        sx={tasksFiltersStyles.search}
      />

      <SelectField
        label={TASKS_FILTER_STATUS_LABEL_TEXT}
        value={toSelectValue(selectedStatus)}
        onChange={(value) => onStatusChange(fromSelectValue(value as TaskStatus | ''))}
        sx={tasksFiltersStyles.select}
        options={STATUS_OPTIONS}
      />

      <SelectField
        label={TASKS_FILTER_PRIORITY_LABEL_TEXT}
        value={toSelectValue(selectedPriority)}
        onChange={(value) => onPriorityChange(fromSelectValue(value as TaskPriority | ''))}
        sx={tasksFiltersStyles.select}
        options={PRIORITY_OPTIONS}
      />

      <SelectField
        label={TASKS_FILTER_TAG_LABEL_TEXT}
        value={selectedTag ?? ''}
        onChange={(value) => onTagChange(value || null)}
        sx={tasksFiltersStyles.select}
        options={tagOptions}
      />
    </Stack>
  )
}
