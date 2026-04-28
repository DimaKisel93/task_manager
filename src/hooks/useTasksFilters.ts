import { useState } from 'react'
import type { TaskPriority, TaskStatus } from '../types/task'
import { emptyToUndefined } from '../utils/helpers'

interface TasksFiltersState {
  page: number
  tag: string | null
  status: TaskStatus | ''
  priority: TaskPriority | ''
}

export function useTasksFilters() {
  const [state, setState] = useState<TasksFiltersState>({
    page: 1,
    tag: null,
    status: '',
    priority: '',
  })

  const setPage = (page: number) => setState((prev) => ({ ...prev, page }))
  const goToFirstPage = () => setPage(1)

  const setTag = (tag: string | null) =>
    setState((prev) => ({
      ...prev,
      tag,
      page: 1,
    }))

  const setStatus = (status: TaskStatus | '') =>
    setState((prev) => ({
      ...prev,
      status,
      page: 1,
    }))

  const setPriority = (priority: TaskPriority | '') =>
    setState((prev) => ({
      ...prev,
      priority,
      page: 1,
    }))

  const resetFilters = () =>
    setState((prev) => ({
      ...prev,
      tag: null,
      status: '',
      priority: '',
      page: 1,
    }))

  return {
    state,
    actions: {
      setPage,
      goToFirstPage,
      setTag,
      setStatus,
      setPriority,
      resetFilters,
    },
    query: {
      page: state.page,
      tag: emptyToUndefined(state.tag),
      status: emptyToUndefined(state.status),
      priority: emptyToUndefined(state.priority),
    },
  }
}
