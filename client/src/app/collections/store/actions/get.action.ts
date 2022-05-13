import { createAction, props } from '@ngrx/store'

import { ActionTypes } from '../actionTypes'

import { CollectionInterface } from './../../types/collection.interface'

export const getCollectionsAction = createAction(
    ActionTypes.GET_COLLECTIONS
)

export const getCollectionsSuccessAction = createAction(
    ActionTypes.GET_COLLECTIONS_SUCCESS,
    props<{ collections: CollectionInterface[] }>()
)
