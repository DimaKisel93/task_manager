import { Alert, Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { useGetTagsQuery, useGetTasksQuery } from '../services/tasksApi'
import { TaskCard } from '../components/tasks/TaskCard'
import { TaskFormModal } from '../components/modals/TaskFormModal'
import { TasksFilters } from '../components/tasks/TasksFilters'
import { TasksSortBar } from '../components/tasks/TasksSortBar'
import {
  PAGE_SIZE,
  TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT,
  TASKS_PAGE_CLEAR_FILTERS_TEXT,
  TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT,
  TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT,
  TASKS_PAGE_LOAD_ERROR_TEXT,
  TASKS_PAGE_NEW_TASK_TEXT,
} from '../constants/tasks'
import { tasksPageStyles } from '../constants/styles'
import { useTasksFilters } from '../hooks/useTasksFilters'
import { buildActiveFilters } from '../utils/task'
import { AppButton, EmptyState, ErrorState, LoadingState } from '../components/ui'
import { PageHeaderActions } from '../components/layout/PageHeaderActions'

export function TasksPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const {
    state: { page, search, sortBy, sortOrder, tag, status, priority },
    actions,
    query,
  } = useTasksFilters()
  const { data: tags = [] } = useGetTagsQuery()

  const { data, isLoading, isFetching, isError } = useGetTasksQuery({
    page: query.page,
    limit: PAGE_SIZE,
    search: query.search,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    tag: query.tag,
    status: query.status,
    priority: query.priority,
  })
  const tasks = data?.items ?? []
  const total = data?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState message={TASKS_PAGE_LOAD_ERROR_TEXT} />
  }

  const activeFilters = buildActiveFilters({
    search,
    sortBy,
    sortOrder,
    tag,
    status,
    priority,
  })
  const hasFilters = activeFilters.length > 0

  return (
    <Stack spacing={2}>
      <PageHeaderActions
        right={
          <AppButton variant="contained" onClick={() => setIsFormOpen(true)}>
            {TASKS_PAGE_NEW_TASK_TEXT}
          </AppButton>
        }
      />

      <TasksFilters
        search={search}
        selectedStatus={status}
        selectedPriority={priority}
        selectedTag={tag}
        tags={tags}
        onSearchChange={actions.setSearch}
        onStatusChange={actions.setStatus}
        onPriorityChange={actions.setPriority}
        onTagChange={actions.setTag}
      />

      <TasksSortBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={actions.setSortBy}
        onSortOrderChange={actions.setSortOrder}
      />

      {hasFilters && (
        <Alert
          severity="info"
          action={
            <AppButton color="inherit" size="small" onClick={actions.resetFilters}>
              {TASKS_PAGE_CLEAR_FILTERS_TEXT}
            </AppButton>
          }
        >
          {TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT} {activeFilters.join(', ')}
        </Alert>
      )}
      {isFetching && <LoadingState size={24} />}
      {tasks.length === 0 ? (
        <EmptyState
          message={hasFilters ? TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT : TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT}
        />
      ) : (
        <>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onTagClick={actions.setTag} />
          ))}
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            sx={tasksPageStyles.pagination}
            onChange={(_, value) => actions.setPage(value)}
          />
        </>
      )}

      <TaskFormModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Stack>
  )
}
