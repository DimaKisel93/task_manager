import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { TASK_CARD_STATUS_LABEL_TEXT, statusMap } from '../../constants/tasks'
import type { Task } from '../../types/task'

interface TaskStatusSelectProps {
  taskId: string
  status: Task['status']
  disabled: boolean
  onStatusChange: (newStatus: Task['status']) => void
}

export function TaskStatusSelect({
  taskId,
  status,
  disabled,
  onStatusChange,
}: TaskStatusSelectProps) {
  const handleChange = (event: SelectChangeEvent<Task['status']>) => {
    onStatusChange(event.target.value as Task['status'])
  }

  return (
    <FormControl size="small" sx={{ minWidth: 140 }} onClick={(e) => e.stopPropagation()}>
      <InputLabel id={`task-status-label-${taskId}`}>{TASK_CARD_STATUS_LABEL_TEXT}</InputLabel>
      <Select
        labelId={`task-status-label-${taskId}`}
        value={status}
        label={TASK_CARD_STATUS_LABEL_TEXT}
        disabled={disabled}
        onChange={handleChange}
      >
        <MenuItem value="todo">{statusMap.todo.label}</MenuItem>
        <MenuItem value="inProgress">{statusMap.inProgress.label}</MenuItem>
        <MenuItem value="done">{statusMap.done.label}</MenuItem>
      </Select>
    </FormControl>
  )
}
