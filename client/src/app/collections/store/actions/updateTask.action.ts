import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { TaskInterface } from 'src/app/shared/types/task.interface'

export const updateTaskAction = createAction(
    ActionTypes.UPDATE_TASK,
    props<{ _id: string, collId: string }>()
)

export const updateTaskSuccessAction = createAction(
    ActionTypes.UPDATE_TASK_SUCCESS,
    props<{ task: TaskInterface, collId: string }>()
)