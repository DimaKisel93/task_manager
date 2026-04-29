import { useState } from 'react'
import type { TaskPriority, TaskStatus } from '../types/task'
import { emptyToUndefined } from '../utils/helpers'
import type { TasksSortBy, TasksSortOrder } from '../types/tasksApi'

interface TasksFiltersState {
  page: number
  search: string
  sortBy: TasksSortBy | null
  sortOrder: TasksSortOrder
  tag: string | null
  status: TaskStatus | null
  priority: TaskPriority | null
}

export function useTasksFilters() {
  const [state, setState] = useState<TasksFiltersState>({
    page: 1,
    search: '',
    sortBy: null,
    sortOrder: 'asc',
    tag: null,
    status: null,
    priority: null,
  })

  const setPage = (page: number) => setState((prev) => ({ ...prev, page }))
  const goToFirstPage = () => setPage(1)

  const setTag = (tag: string | null) =>
    setState((prev) => ({
      ...prev,
      tag,
      page: 1,
    }))

  const setSearch = (search: string) =>
    setState((prev) => ({
      ...prev,
      search,
      page: 1,
    }))

  const setSortBy = (sortBy: TasksSortBy | null) =>
    setState((prev) => ({
      ...prev,
      sortBy,
      page: 1,
    }))

  const setSortOrder = (sortOrder: TasksSortOrder) =>
    setState((prev) => ({
      ...prev,
      sortOrder,
      page: 1,
    }))

  const setStatus = (status: TaskStatus | null) =>
    setState((prev) => ({
      ...prev,
      status,
      page: 1,
    }))

  const setPriority = (priority: TaskPriority | null) =>
    setState((prev) => ({
      ...prev,
      priority,
      page: 1,
    }))

  const resetFilters = () =>
    setState((prev) => ({
      ...prev,
      search: '',
      sortBy: null,
      sortOrder: 'asc',
      tag: null,
      status: null,
      priority: null,
      page: 1,
    }))

  return {
    state,
    actions: {
      setPage,
      goToFirstPage,
      setSearch,
      setSortBy,
      setSortOrder,
      setTag,
      setStatus,
      setPriority,
      resetFilters,
    },
    query: {
      page: state.page,
      search: emptyToUndefined(state.search.trim()),
      sortBy: emptyToUndefined(state.sortBy),
      sortOrder: state.sortBy ? state.sortOrder : undefined,
      tag: emptyToUndefined(state.tag),
      status: emptyToUndefined(state.status),
      priority: emptyToUndefined(state.priority),
    },
  }
}
