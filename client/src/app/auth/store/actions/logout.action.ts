import { createAction } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

export const logoutAction = createAction(ActionTypes.LOGOUT)

export const logoutSuccessAction = createAction(ActionTypes.LOGOUT_SUCCESS)
