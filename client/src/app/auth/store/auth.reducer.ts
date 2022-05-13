import { createReducer, on } from '@ngrx/store'

import { AuthStateInterface } from './../types/authState.interface'

import { registerAction, registerSuccessAction, registerFailAction } from './actions/register.action'
import { loginAction, loginSuccessAction, loginFailAction } from './actions/login.action'
import { getUserAction, getUserSuccessAction, getUserFailAction } from './actions/user.action'
import { logoutSuccessAction } from './actions/logout.action'

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    isLoggedIn: false,
    user: null,
    loginErrors: null,
    registerErrors: null
}

export const authReducer = createReducer(
    initialState,
    on(
        registerAction,
        loginAction,
        state => ({
            ...state,
            isSubmitting: true,
            loginErrors: null,
            registerErrors: null,
        })
    ),
    on(
        registerSuccessAction,
        loginSuccessAction,
        (state, action) => ({
            ...state,
            user: action.user,
            isSubmitting: false,
            isLoggedIn: true,
            loginErrors: '',
            registerErrors: ''
        })
    ),
    on(
        registerFailAction,
        (state, action) => ({
            ...state,
            registerErrors: action.errors,
            isSubmitting: false,
        })
    ),
    on(
        loginFailAction,
        (state, action) => ({
            ...state,
            loginErrors: action.errors,
            isSubmitting: false,
        })
    ),
    on(
        logoutSuccessAction,
        () => ({
            ...initialState,
            isLoggedIn: false
        })
    ),
    on(
        getUserAction,
        state => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getUserSuccessAction,
        (state, action) => ({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            user: action.user
        })
    ),
    on(
        getUserFailAction,
        state => ({
            ...state,
            isLoading: false,
            isLoggedIn: false,
            user: null
        })
    )
)
