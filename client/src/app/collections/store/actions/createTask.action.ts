import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { TaskInterface } from 'src/app/shared/types/task.interface'
import { CreateTaskInterface } from './../../types/createTask.interface'

export const createTaskAction = createAction(
    ActionTypes.CREATE_TASK,
    props<{ request: CreateTaskInterface, collId: string }>()
)

export const createTaskSuccessAction = createAction(
    ActionTypes.CREATE_TASK_SUCCESS,
    props<{ task: TaskInterface, collId: string }>()
)
