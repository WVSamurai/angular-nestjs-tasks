import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'
import { UserInterface } from './../../../shared/types/user.interface'

export const getUserAction = createAction(ActionTypes.GET_USER)

export const getUserSuccessAction = createAction(
    ActionTypes.GET_USER_SUCCESS,
    props<{ user: UserInterface }>()
)

export const getUserFailAction = createAction(ActionTypes.GET_USER_FAIL)
