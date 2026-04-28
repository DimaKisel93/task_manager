import { Alert, Button, CircularProgress, Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { useGetTasksQuery } from '../services/tasksApi'
import { TaskCard } from '../components/TaskCard'
import { PAGE_SIZE } from '../constants/tasks'

export function TasksPage() {
  const [page, setPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const { data, isLoading, isFetching, isError } = useGetTasksQuery({
    page,
    limit: PAGE_SIZE,
    tag: selectedTag ?? undefined,
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
    if (selectedTag) {
      return (
        <Alert
          severity="info"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setSelectedTag(null)
                setPage(1)
              }}
            >
              Clear
            </Button>
          }
        >
          No tasks found for tag: {selectedTag}
        </Alert>
      )
    }

    return <Alert severity="info">No tasks yet. Create your first one.</Alert>
  }

  return (
    <Stack spacing={2}>
      {selectedTag && (
        <Alert
          severity="info"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setSelectedTag(null)
                setPage(1)
              }}
            >
              Clear
            </Button>
          }
        >
          Filtered by tag: {selectedTag}
        </Alert>
      )}
      {isFetching && <CircularProgress size={24} />}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onTagClick={(tag) => {
            setSelectedTag(tag)
            setPage(1)
          }}
        />
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
