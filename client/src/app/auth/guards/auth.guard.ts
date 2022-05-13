import { Injectable, Inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import { selectIsLoggedIn } from 'src/app/auth/store/selectors'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    can!: boolean

    constructor(@Inject(Store) private store: Store<AppStateInterface>) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem('accessToken')

        if (token) {
            return false
        }

        const sub = this.store.pipe(select(selectIsLoggedIn)).subscribe(val => {
            this.can = !val
        })

        sub.unsubscribe()
        return this.can
    }
}
