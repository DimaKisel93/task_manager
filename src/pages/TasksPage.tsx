import { Alert, CircularProgress, Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { useGetTasksQuery } from '../services/tasksApi'
import { TaskCard } from '../components/TaskCard'
import { PAGE_SIZE } from '../constants/tasks'

export function TasksPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, isError } = useGetTasksQuery({
    page,
    limit: PAGE_SIZE,
  })
  const tasks = data?.items ?? []
  const total = data?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Alert severity="error">Failed to load tasks.</Alert>
  }

  if (tasks.length === 0) {
    return <Alert severity="info">No tasks yet. Create your first one.</Alert>
  }

  return (
    <Stack spacing={2}>
      {isFetching && <CircularProgress size={24} />}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <Pagination
        page={page}
        count={pageCount}
        color="primary"
        sx={{ alignSelf: 'center' }}
        onChange={(_, value) => setPage(value)}
      />
    </Stack>
  )
}
