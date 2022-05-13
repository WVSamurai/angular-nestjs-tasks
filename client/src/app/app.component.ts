import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { getUserAction } from './auth/store/actions/user.action'

import { AppStateInterface } from './shared/types/appState.interface'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.store.dispatch(getUserAction())
    }
}
