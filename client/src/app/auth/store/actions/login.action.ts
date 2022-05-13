import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { LoginRequestInterface } from './../../types/loginRequest.interface'
import { UserInterface } from './../../../shared/types/user.interface'

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ request: LoginRequestInterface }>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ user: UserInterface }>()
)

export const loginFailAction = createAction(
    ActionTypes.LOGIN_FAIL,
    props<{ errors: string }>()
)
