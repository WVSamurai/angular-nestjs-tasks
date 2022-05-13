import { Injectable } from '@angular/core'
import { 
    ActivatedRouteSnapshot, 
    Resolve, 
    RouterStateSnapshot, 
} from '@angular/router'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { AppStateInterface } from '../types/appState.interface'
import { selectIsLoggedIn } from './../../auth/store/selectors'
import { selectCollections } from 'src/app/collections/store/selectors'
import { getCollectionsAction } from './../../collections/store/actions/get.action'

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements Resolve<any> {
    can!: boolean

    constructor(private store: Store<AppStateInterface>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(selectIsLoggedIn).pipe(take(1))
    }
}
