import { TASK_CARD_STATUS_LABEL_TEXT, STATUS_MAP } from '../../constants/tasks'
import type { Task } from '../../types/task'
import { SelectField } from '../ui'

interface TaskStatusSelectProps {
  status: Task['status']
  disabled: boolean
  onStatusChange: (newStatus: Task['status']) => void
}

export function TaskStatusSelect({ status, disabled, onStatusChange }: TaskStatusSelectProps) {
  return (
    <SelectField
      label={TASK_CARD_STATUS_LABEL_TEXT}
      value={status}
      disabled={disabled}
      size="small"
      sx={{ minWidth: 140 }}
      onClick={(e) => e.stopPropagation()}
      onChange={(newStatus) => onStatusChange(newStatus as Task['status'])}
      options={[
        { value: 'todo', label: STATUS_MAP.todo.label },
        { value: 'inProgress', label: STATUS_MAP.inProgress.label },
        { value: 'done', label: STATUS_MAP.done.label },
      ]}
    />
  )
}
