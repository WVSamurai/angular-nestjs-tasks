import { createSelector } from '@ngrx/store'

import { AppStateInterface } from './../../shared/types/appState.interface'

const selectCollectionsFeature = (state: AppStateInterface) => state.collections

export const selectIsSubmitting = createSelector(
    selectCollectionsFeature,
    (state) => state.isSubmitting
)

export const selectIsLoading = createSelector(
    selectCollectionsFeature,
    (state) => state.isLoading
)

export const selectCollections = createSelector(
    selectCollectionsFeature,
    (state) => state.collections
)

export const selectCollection = (_id: string) => createSelector(
    selectCollections,
    (state) => state[_id]
)
