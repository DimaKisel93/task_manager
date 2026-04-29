import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Task } from '../types/task'
import {
  TASK_CARD_OVERDUE_TEXT,
  TASK_CARD_STATUS_LABEL_TEXT,
  TASK_CARD_CREATED_PREFIX_TEXT,
  TASK_CARD_DEADLINE_PREFIX_TEXT,
  TASK_CARD_PRIORITY_PREFIX_TEXT,
  TASK_CARD_UPDATED_PREFIX_TEXT,
  priorityMap,
  statusMap,
} from '../constants/tasks'
import { useUpdateTaskStatusMutation } from '../services/tasksApi'
import { isTaskOverdue } from '../utils/task'
import { taskCardStyles } from '../constants/taskStyles'

interface TaskCardProps {
  task: Task
  onTagClick?: (tag: string) => void
}

export function TaskCard({ task, onTagClick }: TaskCardProps) {
  const navigate = useNavigate()
  const isOverdue = isTaskOverdue(task)
  const [updateTaskStatus, { isLoading: isUpdatingStatus }] = useUpdateTaskStatusMutation()

  const handleStatusChange = (event: SelectChangeEvent<Task['status']>) => {
    updateTaskStatus({
      id: task.id,
      status: event.target.value as Task['status'],
    })
      .unwrap()
      .catch((error) => console.error('Failed to update:', error))
  }

  return (
    <Card
      key={task.id}
      sx={{
        transition: 'all 0.2s ease',
        ...(isOverdue && taskCardStyles.overdue),
      }}
    >
      <CardActionArea onClick={() => navigate(`/task/${task.id}`)}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{task.title}</Typography>
            <Stack direction="row" spacing={1}>
              {isOverdue && <Chip label={TASK_CARD_OVERDUE_TEXT} color="error" size="medium" />}
              <Chip label={statusMap[task.status].label} color={statusMap[task.status].color} />
            </Stack>
          </Stack>
          {task.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
          )}
          <FormControl
            size="small"
            sx={{ mt: 1, minWidth: 180 }}
            onClick={(event) => event.stopPropagation()}
          >
            <InputLabel id={`task-status-label-${task.id}`}>
              {TASK_CARD_STATUS_LABEL_TEXT}
            </InputLabel>
            <Select
              labelId={`task-status-label-${task.id}`}
              value={task.status}
              label={TASK_CARD_STATUS_LABEL_TEXT}
              disabled={isUpdatingStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value="todo">{statusMap.todo.label}</MenuItem>
              <MenuItem value="inProgress">{statusMap.inProgress.label}</MenuItem>
              <MenuItem value="done">{statusMap.done.label}</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              label={`${TASK_CARD_PRIORITY_PREFIX_TEXT} ${priorityMap[task.priority].label}`}
              color={priorityMap[task.priority].color}
            />
            <Chip
              label={`${TASK_CARD_DEADLINE_PREFIX_TEXT} ${new Date(task.deadline).toLocaleDateString()}`}
            />
          </Stack>
          {task.tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {task.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  clickable={Boolean(onTagClick)}
                  onClick={(event) => {
                    event.stopPropagation()
                    onTagClick?.(tag)
                  }}
                />
              ))}
            </Stack>
          )}
          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', display: 'block' }}>
            {TASK_CARD_CREATED_PREFIX_TEXT} {new Date(task.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            {TASK_CARD_UPDATED_PREFIX_TEXT} {new Date(task.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
