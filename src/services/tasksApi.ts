import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Tag, Task } from '../types/task'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Tasks', 'Tags'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),
    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
      providesTags: ['Tags'],
    }),
  }),
})

export const { useGetTasksQuery, useGetTagsQuery } = tasksApi
