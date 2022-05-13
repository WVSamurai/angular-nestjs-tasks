import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { CollectionInterface } from 'src/app/collections/types/collection.interface'
import { TaskInterface } from './../../shared/types/task.interface'

import { selectCollection } from 'src/app/collections/store/selectors'

import { deleteCollectionAction } from './../../collections/store/actions/delete.action'
import { createTaskAction } from 'src/app/collections/store/actions/createTask.action'
import { getCollectionsAction } from './../../collections/store/actions/get.action'
import { selectIsLoggedIn } from 'src/app/auth/store/selectors';

@Component({
    selector: 'collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
    _id!: string
    collection!: CollectionInterface
    collSubscription!: Subscription
    tasks: TaskInterface[] = []
    completedTasks: TaskInterface[] = []
    showMore: boolean = false
    isAdd: boolean = false
    newTaskText: string = ''
    newTaskDate: Date | null = null
    isLoggedIn!: boolean
    isLogSubscription!: Subscription

    constructor(
        private store: Store<AppStateInterface>,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => this._id = params['id'])
        this.isLogSubscription = this.store.pipe(
            select(selectIsLoggedIn)
        ).subscribe(res => this.isLoggedIn = res)
        
        this.collSubscription = this.store.pipe(
            select(selectCollection(this._id))
        ).subscribe(coll => {
            if (coll) {
                this.collection = coll
    
                this.filterTasks(this.collection.tasks)
            } else {
                this.isLoggedIn && this.store.dispatch(getCollectionsAction())
            }
        })
    }

    ngOnDestroy(): void {
        this.collSubscription.unsubscribe()
        this.isLogSubscription.unsubscribe()
    }

    filterTasks(tasks: CollectionInterface['tasks']) {
        const values = Object.values(tasks)
        this.tasks = []
        this.completedTasks = []

        for (let task of values) {
            if (task.completed) {
                this.completedTasks.push(task)
            } else {
                this.tasks.push(task)
            }
        }

        this.tasks.reverse()
        this.completedTasks.reverse()
    }

    show(target: EventTarget | null): void {
        if ((target as HTMLDivElement).id !== 'show-more') {
            this.showMore = false
        }
    }

    onAdd(): void {
        this.isAdd = !this.isAdd
    }

    todayDate(): string {
        const today = new Date()
        const dd = today.getDate()
        const mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        let day = ''
        let month = ''
    
        dd < 10 ? day = '0' + dd : day = String(dd)

        mm < 10 ? month = '0' + mm : month = String(mm)

        return yyyy + '-' + month + '-' + day
    }

    onCreate(): void {
        if (!this.newTaskText) return

        this.store.dispatch(
            createTaskAction(
                {
                    request: { text: this.newTaskText, completeTo: this.newTaskDate },
                    collId: this._id
                }
            )
        )

        this.newTaskDate = null
        this.newTaskText = ''
        this.onAdd()
    }

    onDelete(): void {
        this.store.dispatch(deleteCollectionAction({ _id: this._id }))
    }
}
