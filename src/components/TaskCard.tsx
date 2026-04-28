import {
  Card,
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
import type { Task } from '../types/task'
import { priorityMap, statusMap } from '../constants/tasks'
import { useUpdateTaskStatusMutation } from '../services/tasksApi'
import { isTaskOverdue } from '../utils/task'
import { taskCardStyles } from '../constants/taskStyles'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
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
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{task.title}</Typography>
          <Stack direction="row" spacing={1}>
            {isOverdue && <Chip label="Overdue" color="error" size="medium" />}
            <Chip label={statusMap[task.status].label} color={statusMap[task.status].color} />
          </Stack>
        </Stack>
        {task.description && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
        )}
        <FormControl size="small" sx={{ mt: 1, minWidth: 180 }}>
          <InputLabel id={`task-status-label-${task.id}`}>Status</InputLabel>
          <Select
            labelId={`task-status-label-${task.id}`}
            value={task.status}
            label="Status"
            disabled={isUpdatingStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            label={`Priority: ${priorityMap[task.priority].label}`}
            color={priorityMap[task.priority].color}
          />
          <Chip label={`Deadline: ${new Date(task.deadline).toLocaleDateString()}`} />
        </Stack>
        {task.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {task.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}
        <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', display: 'block' }}>
          Created: {new Date(task.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          Updated: {new Date(task.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}
