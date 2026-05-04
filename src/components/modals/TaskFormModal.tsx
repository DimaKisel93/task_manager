import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  FORM_ID,
  TASK_FORM_CANCEL_TEXT,
  TASK_FORM_CREATE_TITLE_TEXT,
  TASK_FORM_DEADLINE_LABEL_TEXT,
  TASK_FORM_DESCRIPTION_LABEL_TEXT,
  TASK_FORM_EDIT_TITLE_TEXT,
  TASK_FORM_ERROR_GENERIC_TEXT,
  TASK_FORM_PRIORITY_LABEL_TEXT,
  TASK_FORM_STATUS_LABEL_TEXT,
  TASK_FORM_SUBMIT_CREATE_TEXT,
  TASK_FORM_SUBMIT_SAVE_TEXT,
  TASK_FORM_TAGS_LABEL_TEXT,
  TASK_FORM_TITLE_LABEL_TEXT,
  priorityMap,
  statusMap,
} from '../../constants/tasks'
import { taskFormSchema, type TaskFormValues } from '../../schemas/taskFormSchema'
import {
  useCreateTaskMutation,
  useGetTagsQuery,
  useUpdateTaskMutation,
} from '../../services/tasksApi'
import type { Task } from '../../types/task'
import { taskFormModalStyles } from '../../constants/styles'
import { BaseModal } from './BaseModal'
import { defaultValues, normalizeTags } from '../../utils/task'

interface TaskFormModalProps {
  open: boolean
  task?: Task | null
  onClose: () => void
}

export function TaskFormModal({ open, task, onClose }: TaskFormModalProps) {
  const isEdit = Boolean(task)
  const { data: tags = [] } = useGetTagsQuery()
  const [createTask, { isLoading: isCreating, isError: isCreateError }] = useCreateTaskMutation()
  const [updateTask, { isLoading: isUpdating, isError: isUpdateError }] = useUpdateTaskMutation()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultValues(task),
  })

  useEffect(() => {
    if (open) {
      reset(defaultValues(task))
    }
  }, [open, task, reset])

  const isSubmitting = isCreating || isUpdating
  const isMutationError = isCreateError || isUpdateError

  const onSubmit = (values: TaskFormValues) => {
    const now = new Date().toISOString()
    const tagList = normalizeTags(values.tags)
    const description = values.description.trim() === '' ? undefined : values.description.trim()

    if (task) {
      updateTask({
        id: task.id,
        title: values.title.trim(),
        description,
        status: values.status,
        priority: values.priority,
        deadline: values.deadline,
        tags: tagList,
        createdAt: task.createdAt,
        updatedAt: now,
      })
        .unwrap()
        .then(() => onClose())
        .catch(() => undefined)
    } else {
      createTask({
        title: values.title.trim(),
        description,
        status: values.status,
        priority: values.priority,
        deadline: values.deadline,
        tags: tagList,
        createdAt: now,
        updatedAt: now,
      })
        .unwrap()
        .then(() => onClose())
        .catch(() => undefined)
    }
  }

  const tagOptions = tags.map((t) => t.name)

  return (
    <BaseModal
      open={open}
      title={isEdit ? TASK_FORM_EDIT_TITLE_TEXT : TASK_FORM_CREATE_TITLE_TEXT}
      onClose={onClose}
      maxWidth="sm"
      content={
        <Stack
          component="form"
          id={FORM_ID}
          spacing={2}
          sx={taskFormModalStyles.form}
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e)
          }}
        >
          {isMutationError && <Alert severity="error">{TASK_FORM_ERROR_GENERIC_TEXT}</Alert>}
          <TextField
            {...register('title')}
            label={TASK_FORM_TITLE_LABEL_TEXT}
            fullWidth
            required
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            {...register('description')}
            label={TASK_FORM_DESCRIPTION_LABEL_TEXT}
            fullWidth
            multiline
            minRows={3}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.status)}>
                <InputLabel id="task-form-status-label">{TASK_FORM_STATUS_LABEL_TEXT}</InputLabel>
                <Select
                  value={field.value}
                  labelId="task-form-status-label"
                  label={TASK_FORM_STATUS_LABEL_TEXT}
                  onChange={(e: SelectChangeEvent) => field.onChange(e.target.value)}
                >
                  <MenuItem value="todo">{statusMap.todo.label}</MenuItem>
                  <MenuItem value="inProgress">{statusMap.inProgress.label}</MenuItem>
                  <MenuItem value="done">{statusMap.done.label}</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.priority)}>
                <FormLabel id="task-form-priority-label">{TASK_FORM_PRIORITY_LABEL_TEXT}</FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-labelledby="task-form-priority-label"
                  row
                >
                  <FormControlLabel value="low" control={<Radio />} label={priorityMap.low.label} />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label={priorityMap.medium.label}
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label={priorityMap.high.label}
                  />
                </RadioGroup>
                {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <TextField
            {...register('deadline')}
            label={TASK_FORM_DEADLINE_LABEL_TEXT}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.deadline)}
            helperText={errors.deadline?.message}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                freeSolo
                options={tagOptions}
                value={field.value}
                onChange={(_, newValue) => {
                  field.onChange(
                    normalizeTags(newValue.map((v) => (typeof v === 'string' ? v : String(v)))),
                  )
                }}
                onBlur={field.onBlur}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={TASK_FORM_TAGS_LABEL_TEXT}
                    error={Boolean(errors.tags)}
                    helperText={errors.tags?.message}
                  />
                )}
              />
            )}
          />
        </Stack>
      }
      actions={
        <>
          <Button onClick={onClose} disabled={isSubmitting}>
            {TASK_FORM_CANCEL_TEXT}
          </Button>
          <Button type="submit" form={FORM_ID} variant="contained" disabled={isSubmitting}>
            {isEdit ? TASK_FORM_SUBMIT_SAVE_TEXT : TASK_FORM_SUBMIT_CREATE_TEXT}
          </Button>
        </>
      }
    />
  )
}
