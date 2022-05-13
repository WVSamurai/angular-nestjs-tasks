import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

export const deleteTaskAction = createAction(
    ActionTypes.DELETE_TASK,
    props<{ _id: string, collId: string }>()
)

export const deleteTaskSuccessAction = createAction(
    ActionTypes.DELETE_TASK_SUCCESS,
    props<{ _id: string, collId: string }>()
)