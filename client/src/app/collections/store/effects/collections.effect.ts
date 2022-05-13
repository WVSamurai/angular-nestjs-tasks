import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { switchMap, map, tap, catchError, EMPTY } from 'rxjs'

import { createCollectionAction, createCollectionSuccessAction } from './../actions/create.action'
import { getCollectionsAction, getCollectionsSuccessAction } from './../actions/get.action'
import { deleteCollectionAction, deleteCollectionSuccessAction } from './../actions/delete.action'

import { CollectionsService } from './../../services/collections.service'

import { AppStateInterface } from './../../../shared/types/appState.interface'

@Injectable()
export class CollectionsEffect {
    createCollection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCollectionAction),
            switchMap(({ request }) => {
                return this.collectionsService.createCollection(request).pipe(
                    map(response => {
                        this.store.dispatch(getCollectionsAction())
                        return createCollectionSuccessAction({ response })
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    getCollections$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCollectionsAction),
            switchMap(() => {
                return this.collectionsService.getCollections().pipe(
                    map(response => {
                        return getCollectionsSuccessAction({ collections: response })
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    deleteCollection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCollectionAction),
            switchMap(({ _id }) => 
                this.collectionsService.deleteCollection(_id).pipe(
                    map(() => deleteCollectionSuccessAction({ _id }))
                )
            )
        )
    })

    deleteCollectionSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteCollectionSuccessAction),
            tap(() => this.router.navigateByUrl('/collections'))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private collectionsService: CollectionsService,
        private store: Store<AppStateInterface>,
        private router: Router
    ) {}
}
