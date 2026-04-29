import { Alert, Button, CircularProgress, Stack } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TaskCard } from '../components/TaskCard'
import { DeleteTaskConfirmModal } from '../components/modals/DeleteTaskConfirmModal'
import { useDeleteTaskMutation, useGetTaskByIdQuery } from '../services/tasksApi'

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const {
    data: task,
    isLoading,
    isError,
  } = useGetTaskByIdQuery(taskId ?? '', {
    skip: !taskId,
  })
  const [deleteTask, { isLoading: isDeleting, isError: isDeleteError }] = useDeleteTaskMutation()

  if (!taskId) {
    return <Alert severity="error">Task id is missing.</Alert>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError || !task) {
    return <Alert severity="error">Task not found.</Alert>
  }

  const handleDeleteTask = () => {
    deleteTask(task.id)
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false)
        navigate('/', { replace: true })
      })
      .catch(() => undefined)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Button component={Link} to="/" variant="outlined">
          Back to tasks
        </Button>
        <Button color="error" variant="contained" onClick={() => setIsDeleteOpen(true)}>
          Delete
        </Button>
      </Stack>

      {isDeleteError && <Alert severity="error">Failed to delete task.</Alert>}
      <TaskCard task={task} />

      <DeleteTaskConfirmModal
        open={isDeleteOpen}
        taskTitle={task.title}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </Stack>
  )
}
