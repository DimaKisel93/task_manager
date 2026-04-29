import type { TaskStatus, TaskPriority } from '../types/task'

export const statusMap: Record<
  TaskStatus,
  { label: string; color: 'default' | 'warning' | 'success' }
> = {
  todo: { label: 'To Do', color: 'default' },
  inProgress: { label: 'In Progress', color: 'warning' },
  done: { label: 'Done', color: 'success' },
}

export const priorityMap: Record<
  TaskPriority,
  { label: string; color: 'success' | 'warning' | 'error' }
> = {
  low: { label: 'Low', color: 'success' },
  medium: { label: 'Medium', color: 'warning' },
  high: { label: 'High', color: 'error' },
}

export const PAGE_SIZE = 5
export const TASK_STATUS_DONE: TaskStatus = 'done'

export const TASKS_PAGE_LOAD_ERROR_TEXT = 'Failed to load tasks.'
export const TASKS_PAGE_CLEAR_FILTERS_TEXT = 'Clear'
export const TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT = 'Active filters - '
export const TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT = 'No tasks found for selected filters.'
export const TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT = 'No tasks were found'

export const TASKS_FILTER_STATUS_LABEL_TEXT = 'Status'
export const TASKS_FILTER_PRIORITY_LABEL_TEXT = 'Priority'
export const TASKS_FILTER_TAG_LABEL_TEXT = 'Tag'
export const TASKS_FILTER_SEARCH_LABEL_TEXT = 'Search by title'
export const TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT = 'Type to search…'
export const TASKS_FILTER_SORT_BY_LABEL_TEXT = 'Sort by'
export const TASKS_FILTER_SORT_ORDER_LABEL_TEXT = 'Order'
export const TASKS_FILTER_SORT_CREATED_AT_TEXT = 'Created date'
export const TASKS_FILTER_SORT_DEADLINE_TEXT = 'Deadline'
export const TASKS_FILTER_SORT_ASC_TEXT = 'Ascending'
export const TASKS_FILTER_SORT_DESC_TEXT = 'Descending'
export const TASKS_FILTER_ALL_OPTION_TEXT = 'All'

export const TASK_CARD_OVERDUE_TEXT = 'Overdue'
export const TASK_CARD_STATUS_LABEL_TEXT = 'Status'
export const TASK_CARD_PRIORITY_PREFIX_TEXT = 'Priority:'
export const TASK_CARD_DEADLINE_PREFIX_TEXT = 'Deadline:'
export const TASK_CARD_CREATED_PREFIX_TEXT = 'Created:'
export const TASK_CARD_UPDATED_PREFIX_TEXT = 'Updated:'
