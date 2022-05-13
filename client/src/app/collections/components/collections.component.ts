import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { CollectionInterface } from '../types/collection.interface'

import { createCollectionAction } from './../store/actions/create.action'
import { getCollectionsAction } from './../store/actions/get.action'

import { selectIsSubmitting, selectCollections } from './../store/selectors'

@Component({
    selector: 'collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {
    isSubmitting$!: Observable<boolean>
    subscription!: Subscription
    isCreating: boolean = false
    collectionName: string = ''
    randomHex: string = ''
    values: CollectionInterface[] = []

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting))
        this.subscription = this.store.pipe(
            select(selectCollections)
        ).subscribe(col => this.values = Object.values(col))

        if (!this.values.length) this.store.dispatch(getCollectionsAction())

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    onToggleCreate() {
        this.isCreating = !this.isCreating
        this.collectionName = ''

        if (this.isCreating) this.generateRandomHex()
    }

    onCreate() {
        if (this.collectionName && this.randomHex) {
            const request = { name: this.collectionName, hex: this.randomHex }
            
            this.store.dispatch(createCollectionAction({ request }))

            this.isCreating = false
            this.collectionName = ''
            this.randomHex = ''
        }
    }

    randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    generateRandomHex() {
        const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
        this.randomHex = ''

        for (let i = 0; i < 6; i++) {
            const idx = this.randomInteger(0, chars.length - 1)

            this.randomHex += chars[idx]
        }
    }

    getTasksLen(tasks: CollectionInterface['tasks']): string {
        const len = Object.keys(tasks).length

        return len % 10 === 1 ? `${len} task` : `${len} tasks`
    }
}
