import { z } from 'zod'

export const taskFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().max(500, 'Description must be at most 500 characters'),
  status: z.enum(['todo', 'inProgress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  deadline: z.string().min(1, 'Deadline is required'),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'Select at least one tag'),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
