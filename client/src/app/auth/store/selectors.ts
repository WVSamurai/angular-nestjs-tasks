import { createSelector } from '@ngrx/store'

import { AppStateInterface } from './../../shared/types/appState.interface'

export const selectAuth = (state: AppStateInterface) => state.auth

export const selectUser = createSelector(
    selectAuth,
    state => state.user
)

export const selectUserName = createSelector(
    selectUser,
    state => state?.username
)

export const selectIsSubmitting = createSelector(
    selectAuth,
    state => state.isSubmitting
)

export const selectIsLoading = createSelector(
    selectAuth,
    state => state.isLoading
)

export const selectIsLoggedIn = createSelector(
    selectAuth,
    state => state.isLoggedIn
)

export const selectLoginErrors = createSelector(
    selectAuth,
    state => state.loginErrors
)

export const selectRegisterErrors = createSelector(
    selectAuth,
    state => state.registerErrors
)
