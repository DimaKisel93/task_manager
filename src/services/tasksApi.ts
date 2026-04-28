import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Tag, Task } from '../types/task'

export interface GetTasksParams {
  page: number
  limit: number
}

export interface PaginatedTasks {
  items: Task[]
  total: number
}

interface JsonServerPaginatedResponse {
  data: Task[]
  items: number
}

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

export const { useGetTasksQuery, useUpdateTaskStatusMutation, useGetTagsQuery } = tasksApi
