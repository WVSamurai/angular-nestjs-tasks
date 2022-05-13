import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { RegisterRequestInterface } from './../../types/registerRequest.interface'
import { UserInterface } from './../../../shared/types/user.interface'

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterRequestInterface }>()
)

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{ user: UserInterface }>()
)

export const registerFailAction = createAction(
    ActionTypes.REGISTER_FAIL,
    props<{ errors: string }>()
)
