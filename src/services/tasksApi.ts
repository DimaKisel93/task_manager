import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Tag, Task } from '../types/task'
import type { GetTasksParams, PaginatedTasks, JsonServerPaginatedResponse } from '../types/tasksApi'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Tasks', 'Tags'],
  endpoints: (builder) => ({
    getTasks: builder.query<PaginatedTasks, GetTasksParams>({
      query: ({ page, limit }) => `/tasks?_page=${page}&_per_page=${limit}`,
      transformResponse: (response: JsonServerPaginatedResponse): PaginatedTasks => {
        return {
          items: response.data,
          total: response.items,
        }
      },
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
