import { Alert, Button, Stack } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TaskCard } from '../components/tasks/TaskCard'
import { DeleteTaskConfirmModal } from '../components/modals/DeleteTaskConfirmModal'
import { TaskFormModal } from '../components/modals/TaskFormModal'
import { TASK_DETAILS_EDIT_TEXT } from '../constants/tasks'
import { useDeleteTaskMutation, useGetTaskByIdQuery } from '../services/tasksApi'
import { ErrorState, LoadingState } from '../components/ui'
import { PageHeaderActions } from '../components/layout/PageHeaderActions'

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
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
    return <LoadingState />
  }

  if (isError || !task) {
    return <ErrorState message="Task not found." />
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
      <PageHeaderActions
        left={
          <Button component={Link} to="/" variant="outlined">
            Вернуться к задачам
          </Button>
        }
        right={
          <>
            <Button variant="contained" onClick={() => setIsEditOpen(true)}>
              {TASK_DETAILS_EDIT_TEXT}
            </Button>
            <Button color="error" variant="contained" onClick={() => setIsDeleteOpen(true)}>
              Удалить
            </Button>
          </>
        }
      />

      {isDeleteError && <Alert severity="error">Failed to delete task.</Alert>}
      <TaskCard task={task} />

      <DeleteTaskConfirmModal
        open={isDeleteOpen}
        taskTitle={task.title}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteTask}
      />

      <TaskFormModal open={isEditOpen} task={task} onClose={() => setIsEditOpen(false)} />
    </Stack>
  )
}
