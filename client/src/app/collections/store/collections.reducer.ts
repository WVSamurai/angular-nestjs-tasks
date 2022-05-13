import { createReducer, on } from '@ngrx/store'

import { CollectionsStateInterface } from './../types/collectionsState.interface'
import { CollectionInterface } from 'src/app/collections/types/collection.interface'

import { createCollectionAction, createCollectionSuccessAction } from './actions/create.action'
import { getCollectionsAction, getCollectionsSuccessAction } from './actions/get.action'
import { deleteCollectionAction, deleteCollectionSuccessAction } from './actions/delete.action'
import { createTaskAction, createTaskSuccessAction } from './actions/createTask.action'
import { deleteTaskAction, deleteTaskSuccessAction } from './actions/deleteTask.action'
import { updateTaskAction, updateTaskSuccessAction } from './actions/updateTask.action'
import { logoutSuccessAction } from 'src/app/auth/store/actions/logout.action'

const copyCollection = (coll: CollectionInterface) => {
    return {
        ...coll,
        tasks: {
            ...coll.tasks
        }
    }
}

const initialState: CollectionsStateInterface = {
    isLoading: false,
    isSubmitting: false,
    collections: {}
}

export const collectionsReducer = createReducer(
    initialState,
    on(
        logoutSuccessAction,
        state => initialState
    ),
    on(
        createCollectionAction,
        state => ({
            ...state,
            isSubmitting: true
        })
    ),
    on(
        createCollectionSuccessAction,
        state => ({
            ...state,
            isSubmitting: false
        })
    ),
    on(
        getCollectionsAction,
        state => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getCollectionsSuccessAction,
        (state, action) => {
            const collections: CollectionsStateInterface['collections'] = {}

            for (let col of action.collections) {
                collections[col._id] = col
            }

            return {
                ...state,
                isLoading: false,
                collections
            }
        }
    ),
    on(
        deleteCollectionAction,
        state => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        deleteCollectionSuccessAction,
        (state, { _id }) => {
            const collections = { ...state.collections }
            delete collections[_id]

            return {
                ...state,
                isLoading: false,
                collections
            }
        }
    ),
    on(
        createTaskAction,
        (state, action) => {
            const coll = { ...state.collections[action.collId] }
            coll.isSubmitting = true

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [coll._id]: coll
                }
            }
        }
    ),
    on(
        createTaskSuccessAction,
        (state, action) => {
            const coll = state.collections[action.collId]
            const newColl = copyCollection(coll)
            
            newColl.isSubmitting = false
            newColl.tasks[action.task._id] = action.task

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [newColl._id]: newColl
                }
            }
        }
    ),
    on(
        deleteTaskAction,
        (state, action) => {
            const newColl = copyCollection(state.collections[action.collId])

            newColl.isSubmitting = true

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [newColl._id]: newColl
                }
            }
        }
    ),
    on(
        deleteTaskSuccessAction,
        (state, action) => {
            const newColl = copyCollection(state.collections[action.collId])

            newColl.isSubmitting = false
            delete newColl.tasks[action._id]

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [newColl._id]: newColl
                }
            }
        }
    ),
    on(
        updateTaskAction,
        (state, action) => {
            const newColl = copyCollection(state.collections[action.collId])

            newColl.isSubmitting = true

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [newColl._id]: newColl
                }
            }
        }
    ),
    on(
        updateTaskSuccessAction,
        (state, action) => {
            const newColl = copyCollection(state.collections[action.collId])

            newColl.isSubmitting = false
            newColl.tasks[action.task._id] = action.task

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [newColl._id]: newColl
                }
            }
        }
    )
)
