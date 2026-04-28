import { Alert, Button, CircularProgress, Stack } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { TaskCard } from '../components/TaskCard'
import { useGetTaskByIdQuery } from '../services/tasksApi'

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const {
    data: task,
    isLoading,
    isError,
  } = useGetTaskByIdQuery(taskId ?? '', {
    skip: !taskId,
  })

  if (!taskId) {
    return <Alert severity="error">Task id is missing.</Alert>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError || !task) {
    return <Alert severity="error">Task not found.</Alert>
  }

  return (
    <Stack spacing={2}>
      <Button component={Link} to="/" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
        Back to tasks
      </Button>
      <TaskCard task={task} />
    </Stack>
  )
}
