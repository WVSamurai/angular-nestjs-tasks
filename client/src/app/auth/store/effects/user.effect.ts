import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, of, map, catchError } from 'rxjs'

import { getUserAction, getUserFailAction, getUserSuccessAction } from './../actions/user.action'
import { AuthService } from './../../services/auth.service'

@Injectable()
export class UserEffect {
    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUserAction),
            switchMap(() => {
                const token = localStorage.getItem('accessToken')

                if (!token) return of(getUserFailAction())

                return this.authService.refresh().pipe(
                    map(response => getUserSuccessAction({ user: response.user })),
                    catchError(() => of(getUserFailAction()))
                )
            })
        )
    })

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}
}
