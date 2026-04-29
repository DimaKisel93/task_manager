import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import type { GetTasksParams } from '../types/tasksApi'

export const extractTotalCount = (
  meta: FetchBaseQueryMeta | undefined,
  fallbackLength: number,
): number => {
  const totalFromHeader = Number(meta?.response?.headers.get('X-Total-Count'))
  const total = Number.isNaN(totalFromHeader) ? fallbackLength : totalFromHeader
  return total
}

export const buildTasksQuery = ({
  page,
  limit,
  search,
  tag,
  status,
  priority,
}: GetTasksParams): string => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  })

  if (search) {
    params.set('title_like', search)
  }

  if (status) {
    params.set('status', status)
  }

  if (priority) {
    params.set('priority', priority)
  }

  if (tag) {
    params.set('tags_like', tag)
  }

  return `/tasks?${params.toString()}`
}
