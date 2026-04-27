import { Alert, CircularProgress, Stack } from '@mui/material'
import { useGetTasksQuery } from '../services/tasksApi'
import { TaskCard } from '../components/TaskCard'

export function TasksPage() {
  const { data: tasks, isLoading, isError } = useGetTasksQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Alert severity="error">Failed to load tasks.</Alert>
  }

  if (!tasks || tasks.length === 0) {
    return <Alert severity="info">No tasks yet. Create your first one.</Alert>
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}
