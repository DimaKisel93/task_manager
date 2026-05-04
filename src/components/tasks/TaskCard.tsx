import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Task } from '../../types/task'
import {
  TASK_CARD_OVERDUE_TEXT,
  TASK_CARD_CREATED_PREFIX_TEXT,
  TASK_CARD_DEADLINE_PREFIX_TEXT,
  TASK_CARD_PRIORITY_PREFIX_TEXT,
  TASK_CARD_UPDATED_PREFIX_TEXT,
  priorityMap,
  statusMap,
} from '../../constants/tasks'
import { useUpdateTaskStatusMutation } from '../../services/tasksApi'
import { isTaskOverdue } from '../../utils/task'
import { taskCardStyles } from '../../constants/styles'
import { TaskStatusSelect } from './TaskStatusSelect'
import { TaskTags } from './TaskTags '

interface TaskCardProps {
  task: Task
  onTagClick?: (tag: string) => void
}

export function TaskCard({ task, onTagClick }: TaskCardProps) {
  const navigate = useNavigate()
  const isOverdue = isTaskOverdue(task)
  const [updateTaskStatus, { isLoading: isUpdatingStatus }] = useUpdateTaskStatusMutation()

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTaskStatus({
      id: task.id,
      status: newStatus,
    })
      .unwrap()
      .catch((error) => console.error('Failed to update:', error))
  }

  return (
    <Card key={task.id} sx={taskCardStyles.getCard(isOverdue)}>
      <CardActionArea onClick={() => navigate(`/task/${task.id}`)}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{task.title}</Typography>
            <Stack direction="row" spacing={1}>
              <TaskStatusSelect
                taskId={task.id}
                status={task.status}
                disabled={isUpdatingStatus}
                onStatusChange={handleStatusChange}
              />
              <Chip label={statusMap[task.status].label} color={statusMap[task.status].color} />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {task.description && (
              <Typography variant="body2" sx={taskCardStyles.description}>
                {task.description}
              </Typography>
            )}
            <Stack direction="row" spacing={1}>
              {isOverdue && <Chip label={TASK_CARD_OVERDUE_TEXT} color="error" size="medium" />}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} sx={taskCardStyles.chipsRow}>
            <Chip
              label={`${TASK_CARD_PRIORITY_PREFIX_TEXT} ${priorityMap[task.priority].label}`}
              color={priorityMap[task.priority].color}
            />
            <Chip
              label={`${TASK_CARD_DEADLINE_PREFIX_TEXT} ${new Date(task.deadline).toLocaleDateString()}`}
            />
          </Stack>
          <TaskTags tags={task.tags} onTagClick={onTagClick} />
          <Typography variant="caption" sx={taskCardStyles.captionPrimary}>
            {TASK_CARD_CREATED_PREFIX_TEXT} {new Date(task.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" sx={taskCardStyles.captionSecondary}>
            {TASK_CARD_UPDATED_PREFIX_TEXT} {new Date(task.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
