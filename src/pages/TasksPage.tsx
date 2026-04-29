import {
  Alert,
  Button,
  CircularProgress,
  Pagination,
  Stack,
} from '@mui/material'
import { useGetTagsQuery, useGetTasksQuery } from '../services/tasksApi'
import { TaskCard } from '../components/TaskCard'
import { TasksFilters } from '../components/TasksFilters'
import { TasksSortBar } from '../components/TasksSortBar'
import {
  PAGE_SIZE,
  TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT,
  TASKS_PAGE_CLEAR_FILTERS_TEXT,
  TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT,
  TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT,
  TASKS_PAGE_LOAD_ERROR_TEXT,
} from '../constants/tasks'
import { useTasksFilters } from '../hooks/useTasksFilters'
import { buildActiveFilters } from '../utils/task'

export function TasksPage() {
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
    return <CircularProgress />
  }

  if (isError) {
    return <Alert severity="error">{TASKS_PAGE_LOAD_ERROR_TEXT}</Alert>
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
            <Button color="inherit" size="small" onClick={actions.resetFilters}>
              {TASKS_PAGE_CLEAR_FILTERS_TEXT}
            </Button>
          }
        >
          {TASKS_PAGE_ACTIVE_FILTERS_PREFIX_TEXT} {activeFilters.join(', ')}
        </Alert>
      )}
      {isFetching && <CircularProgress size={24} />}
      {tasks.length === 0 ? (
        <Alert severity="info">
          {hasFilters ? TASKS_PAGE_EMPTY_WITH_FILTERS_TEXT : TASKS_PAGE_EMPTY_WITHOUT_FILTERS_TEXT}
        </Alert>
      ) : (
        <>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onTagClick={actions.setTag} />
          ))}
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            sx={{ alignSelf: 'center' }}
            onChange={(_, value) => actions.setPage(value)}
          />
        </>
      )}
    </Stack>
  )
}
