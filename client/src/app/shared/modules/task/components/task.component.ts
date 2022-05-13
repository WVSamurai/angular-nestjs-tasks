import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { updateTaskAction } from './../../../../collections/store/actions/updateTask.action'
import { deleteTaskAction } from './../../../../collections/store/actions/deleteTask.action'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    @Input() text!: string
    @Input() time!: Date | null
    @Input() isCompleted!: boolean
    @Input() isFull!: boolean
    @Input() hex!: string
    @Input() _id!: string
    @Input() collId!: string
    checkTime: boolean = false

    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.checkTime = this.checkTimeHelper()
    }

    checkTimeHelper(): boolean {
        if (this.time) {
            const completeTo = (new Date(this.time)).getTime()
            const newDate = (new Date()).setHours(0, 0, 0, 0)

            return completeTo > newDate
        }

        return true
    }

    onDelete(): void {
        if (this._id && this.collId) 
            this.store.dispatch(deleteTaskAction({ _id: this._id, collId: this.collId }))
    }

    onUpdate(): void {
        if (this._id && this.collId) 
            this.store.dispatch(updateTaskAction({ _id: this._id, collId: this.collId }))
    }
}
