import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { Task } from '../types/task'
import { statusMap, priorityMap } from '../constants/tasks'
import { isTaskOverdue } from '../utils/task'
import { taskCardStyles } from '../constants/taskStyles'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const isOverdue = isTaskOverdue(task)

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
