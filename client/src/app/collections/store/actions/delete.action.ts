import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

export const deleteCollectionAction = createAction(
    ActionTypes.DELETE_COLLECTION,
    props<{ _id: string }>()
)

export const deleteCollectionSuccessAction = createAction(
    ActionTypes.DELETE_COLLECTION_SUCCESS,
    props<{ _id: string }>()
)
