import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { selectUserName } from './../../auth/store/selectors'
import { selectCollections } from './../../collections/store/selectors'

import { getCollectionsAction } from './../../collections/store/actions/get.action'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { CollectionInterface } from 'src/app/collections/types/collection.interface'

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    username$!: Observable<string | undefined>
    subscription!: Subscription
    values!: CollectionInterface[]
    date: Date = new Date()
    getCollectionsCalls: number = 0

    constructor(private store: Store<AppStateInterface>) {}
    
    ngOnInit(): void {
        this.username$ = this.store.pipe(select(selectUserName))

        this.subscription = this.store.pipe(
            select(selectCollections)
        ).subscribe(coll => {
            const collValues = Object.values(coll)

            this.values = this.filterCollections(collValues)
            if (!this.values.length && this.getCollectionsCalls === 0) {
                this.store.dispatch(getCollectionsAction())
                this.getCollectionsCalls++
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    checkDate(): string {
        const date = new Date()
        const hours = date.getHours()

        if (hours >= 6 && hours <= 11) return 'Good morning'
        if (hours > 11 && hours < 18) return 'Good afternoon'
        if (hours >= 18 && hours < 21) return 'Good evening'

        return 'Good night'
    }

    tasksValues(tasks: CollectionInterface['tasks']) {
        return Object.values(tasks)
    }

    dateEquals(completeTo: Date): boolean {
        const newDate = new Date()

        //adds one day to date
        let futureDate = newDate.getTime()
        //set futureDate to midnight
        futureDate = new Date(futureDate).setUTCHours(0, 0, 0, 0)
        
        const completeToTime = (new Date(completeTo)).getTime()

        return completeToTime === futureDate
    }

    filterCollections(collections: CollectionInterface[]): CollectionInterface[] {
        return collections.map(
            collection => {
                const tasksValues = this.tasksValues(collection.tasks)
                const filteredTasks: CollectionInterface['tasks'] = {}

                for (let task of tasksValues) {
                    if (
                        task.completeTo && 
                        this.dateEquals(task.completeTo) &&
                        !task.completed
                    ) {
                        filteredTasks[task._id] = task
                    }
                }

                return {
                    ...collection,
                    tasks: filteredTasks
                }
            }
        )
    }
}
