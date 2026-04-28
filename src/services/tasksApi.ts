import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Tag, Task } from '../types/task'
import type { GetTasksParams, PaginatedTasks } from '../types/tasksApi'
import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { extractTotalCount } from '../utils/task'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Tasks', 'Tags'],
  endpoints: (builder) => ({
    getTasks: builder.query<PaginatedTasks, GetTasksParams>({
      query: ({ page, limit, tag }) => {
        const params = new URLSearchParams({
          _page: String(page),
          _limit: String(limit),
        })
        if (tag) {
          params.append('tags_like', tag)
        }
        return `/tasks?${params.toString()}`
      },
      transformResponse: (response: Task[], meta: FetchBaseQueryMeta): PaginatedTasks => ({
        items: response,
        total: extractTotalCount(meta, response.length),
      }),
      providesTags: ['Tasks'],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: ['Tasks'],
    }),
    updateTaskStatus: builder.mutation<Task, { id: string; status: Task['status'] }>({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: {
          status,
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
      providesTags: ['Tags'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskStatusMutation,
  useGetTagsQuery,
} = tasksApi
