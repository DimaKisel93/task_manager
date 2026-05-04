import type { TaskStatus, TaskPriority } from '../types/task'

export const STATUS_MAP: Record<
  TaskStatus,
  { label: string; color: 'default' | 'warning' | 'success' }
> = {
  todo: { label: 'Выполнить', color: 'default' },
  inProgress: { label: 'В процессе', color: 'warning' },
  done: { label: 'Выполнено', color: 'success' },
}

export const PRIORITY_MAP: Record<
  TaskPriority,
  { label: string; color: 'success' | 'warning' | 'error' }
> = {
  low: { label: 'Низкий', color: 'success' },
  medium: { label: 'Средний', color: 'warning' },
  high: { label: 'Высокий', color: 'error' },
}

export const PAGE_SIZE = 5
export const TASK_STATUS_DONE: TaskStatus = 'done'
export const FORM_ID = 'taskForm'
export const TASK_FORM_PRIORITY_LABEL_ID = 'taskFormPriorityLabel'

export const TASKS_PAGE_LOAD_ERROR_TEXT = 'Не удалось загрузить задачи.'
export const TASKS_PAGE_CLEAR_FILTERS_TEXT = 'Очистить'
export const TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT = 'Активные фильтры - '
export const TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT = 'Не найдено задач для выбранных фильтров.'
export const TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT = 'Не найдено задач'

export const TASKS_FILTER_STATUS_LABEL_TEXT = 'Статус'
export const TASKS_FILTER_PRIORITY_LABEL_TEXT = 'Приоритет'
export const TASKS_FILTER_TAG_LABEL_TEXT = 'Тег'
export const TASKS_FILTER_SEARCH_LABEL_TEXT = 'Поиск по названию задачи'
export const TASKS_FILTER_SEARCH_PLACEHOLDER_TEXT = 'Введите для поиска…'
export const TASKS_FILTER_SORT_BY_LABEL_TEXT = 'Сортировка по'
export const TASKS_FILTER_SORT_ORDER_LABEL_TEXT = 'Порядок'
export const TASKS_FILTER_SORT_CREATED_AT_TEXT = 'Дате создания'
export const TASKS_FILTER_SORT_DEADLINE_TEXT = 'Сроку'
export const TASKS_FILTER_SORT_ASC_TEXT = 'По возрастанию'
export const TASKS_FILTER_SORT_DESC_TEXT = 'По убыванию'
export const TASKS_FILTER_ALL_OPTION_TEXT = 'Все'

export const TASK_CARD_OVERDUE_TEXT = 'Просрочено'
export const TASK_CARD_STATUS_LABEL_TEXT = 'Статус:'
export const TASK_CARD_PRIORITY_PREFIX_TEXT = 'Приоритет:'
export const TASK_CARD_DEADLINE_PREFIX_TEXT = 'Срок:'
export const TASK_CARD_CREATED_PREFIX_TEXT = 'Создано:'
export const TASK_CARD_UPDATED_PREFIX_TEXT = 'Обновлено:'

export const TASK_FORM_CREATE_TITLE_TEXT = 'Новая задача'
export const TASK_FORM_EDIT_TITLE_TEXT = 'Редактирование задачи'
export const TASK_FORM_TITLE_LABEL_TEXT = 'Заголовок'
export const TASK_FORM_DESCRIPTION_LABEL_TEXT = 'Описание'
export const TASK_FORM_STATUS_LABEL_TEXT = 'Статус'
export const TASK_FORM_PRIORITY_LABEL_TEXT = 'Приоритет'
export const TASK_FORM_DEADLINE_LABEL_TEXT = 'Срок'
export const TASK_FORM_TAGS_LABEL_TEXT = 'Теги'
export const TASK_FORM_SUBMIT_CREATE_TEXT = 'Создать'
export const TASK_FORM_SUBMIT_SAVE_TEXT = 'Сохранить'
export const TASK_FORM_CANCEL_TEXT = 'Отменить'
export const TASK_FORM_ERROR_GENERIC_TEXT = 'Что-то пошло не так. Пожалуйста, попробуйте снова.'
export const TASKS_PAGE_NEW_TASK_TEXT = 'Новая задача'
export const TASK_DETAILS_EDIT_TEXT = 'Редактировать'

export const STATUS_OPTIONS = [
  { value: '', label: TASKS_FILTER_ALL_OPTION_TEXT },
  { value: 'todo', label: STATUS_MAP.todo.label },
  { value: 'inProgress', label: STATUS_MAP.inProgress.label },
  { value: 'done', label: STATUS_MAP.done.label },
]

export const PRIORITY_OPTIONS = [
  { value: '', label: TASKS_FILTER_ALL_OPTION_TEXT },
  { value: 'low', label: PRIORITY_MAP.low.label },
  { value: 'medium', label: PRIORITY_MAP.medium.label },
  { value: 'high', label: PRIORITY_MAP.high.label },
]
