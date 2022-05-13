import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'

import { selectIsLoggedIn } from 'src/app/auth/store/selectors'
import { logoutAction } from 'src/app/auth/store/actions/logout.action'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isLoggedIn$!: Observable<boolean>
    isOpen: boolean = false

    constructor(private store: Store<AppStateInterface>) { }

    ngOnInit(): void {
        this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn))
    }

    onLogout(): void {
        this.removeIsOpen()
        this.store.dispatch(logoutAction())
    }

    onOpen(): void {
        this.isOpen = !this.isOpen
    }

    removeIsOpen(): void {
        this.isOpen = false
    }
}