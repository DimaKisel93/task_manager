import { describe, expect, it } from 'vitest'
import { defaultValues, isTaskOverdue, normalizeTags } from './task'
import type { Task } from '../types/task'

describe('isTaskOverdue', () => {
  const now = new Date('2026-05-10T10:00:00.000Z')

  it('returns false for done tasks', () => {
    const doneTask: Task = {
      id: '1',
      title: 'Done task',
      status: 'done',
      priority: 'low',
      deadline: '2026-05-01',
      tags: ['frontend'],
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-01T10:00:00.000Z',
    }

    expect(isTaskOverdue(doneTask, now)).toBe(false)
  })

  it('returns true for unfinished tasks with passed deadline', () => {
    const todoTask: Task = {
      id: '2',
      title: 'Todo task',
      status: 'todo',
      priority: 'high',
      deadline: '2026-05-01',
      tags: ['backend'],
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-01T10:00:00.000Z',
    }

    expect(isTaskOverdue(todoTask, now)).toBe(true)
  })
})

describe('normalizeTags', () => {
  it('trims, deduplicates and removes empty tags', () => {
    expect(normalizeTags([' forms ', '', 'forms', ' api ', 'api'])).toEqual(['forms', 'api'])
  })
})

describe('defaultValues', () => {
  it('returns empty default values for create mode', () => {
    expect(defaultValues()).toEqual({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      deadline: '',
      tags: [],
    })
  })

  it('maps task fields for edit mode', () => {
    const task: Task = {
      id: '3',
      title: 'Task',
      description: 'Description',
      status: 'inProgress',
      priority: 'medium',
      deadline: '2026-05-31T15:45:00.000Z',
      tags: ['forms'],
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-01T10:00:00.000Z',
    }

    expect(defaultValues(task)).toEqual({
      title: 'Task',
      description: 'Description',
      status: 'inProgress',
      priority: 'medium',
      deadline: '2026-05-31',
      tags: ['forms'],
    })
  })
})
