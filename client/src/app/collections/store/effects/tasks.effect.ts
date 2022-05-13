import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError, EMPTY } from 'rxjs'

import { CollectionsService } from './../../services/collections.service'

import { createTaskAction, createTaskSuccessAction } from './../actions/createTask.action'
import { deleteTaskAction, deleteTaskSuccessAction } from './../actions/deleteTask.action'
import { updateTaskAction, updateTaskSuccessAction } from './../actions/updateTask.action'

@Injectable()
export class TasksEffect {
    createTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createTaskAction),
            switchMap(({ request, collId }) => {
                return this.collectionsService.createTask(request, collId).pipe(
                    map(task => createTaskSuccessAction({ task, collId })),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    deleteTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteTaskAction),
            switchMap(({ _id, collId }) => {
                return this.collectionsService.deleteTask(_id, collId).pipe(
                    map(() => deleteTaskSuccessAction({ _id, collId })),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    updateTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateTaskAction),
            switchMap(({ _id, collId }) => {
                return this.collectionsService.updateTask(_id, collId).pipe(
                    map(task => updateTaskSuccessAction({ task, collId })),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    constructor(
        private actions$: Actions,
        private collectionsService: CollectionsService
    ) {}
}
