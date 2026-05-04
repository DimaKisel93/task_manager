import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import {
  TASKS_FILTER_SORT_ASC_TEXT,
  TASKS_FILTER_SORT_BY_LABEL_TEXT,
  TASKS_FILTER_SORT_CREATED_AT_TEXT,
  TASKS_FILTER_SORT_DEADLINE_TEXT,
  TASKS_FILTER_SORT_DESC_TEXT,
} from '../../constants/tasks'
import { tasksSortBarStyles } from '../../constants/styles'
import type { TasksSortBy, TasksSortOrder } from '../../types/tasksApi'
import { fromSelectValue, toSelectValue } from '../../utils/helpers'

interface TasksSortBarProps {
  sortBy: TasksSortBy | null
  sortOrder: TasksSortOrder
  onSortByChange: (sortBy: TasksSortBy | null) => void
  onSortOrderChange: (sortOrder: TasksSortOrder) => void
}

export function TasksSortBar({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: TasksSortBarProps) {
  return (
    <Paper variant="outlined" sx={tasksSortBarStyles.paper}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <FormControl size="small" sx={tasksSortBarStyles.sortByControl}>
          <InputLabel id="tasks-sort-by-label">{TASKS_FILTER_SORT_BY_LABEL_TEXT}</InputLabel>
          <Select
            labelId="tasks-sort-by-label"
            label={TASKS_FILTER_SORT_BY_LABEL_TEXT}
            value={toSelectValue(sortBy)}
            onChange={(event) => {
              const value = fromSelectValue(event.target.value as TasksSortBy | '')
              onSortByChange(value)
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="createdAt">{TASKS_FILTER_SORT_CREATED_AT_TEXT}</MenuItem>
            <MenuItem value="deadline">{TASKS_FILTER_SORT_DEADLINE_TEXT}</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={sortOrder}
          disabled={sortBy === null}
          onChange={(_, value) => {
            const next = value as TasksSortOrder | null
            if (next) onSortOrderChange(next)
          }}
        >
          <ToggleButton value="asc">{TASKS_FILTER_SORT_ASC_TEXT}</ToggleButton>
          <ToggleButton value="desc">{TASKS_FILTER_SORT_DESC_TEXT}</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  )
}
