import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { CreateCollectionInterface } from '../../types/createCollection.interface'

export const createCollectionAction = createAction(
    ActionTypes.CREATE_COLLECTION,
    props<{ request: CreateCollectionInterface }>()
)

export const createCollectionSuccessAction = createAction(
    ActionTypes.CREATE_COLLECTION_SUCCESS,
    props<{ response: boolean }>()
)

export const createCollectionFailAction = createAction(
    ActionTypes.CREATE_COLLECTION_FAIL,
    props<{ response: boolean }>()
)
