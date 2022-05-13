import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, map, tap, catchError, EMPTY } from 'rxjs'

import { logoutSuccessAction, logoutAction } from '../actions/logout.action'

import { AuthService } from 'src/app/auth/services/auth.service'


@Injectable()
export class LogoutEffect {
    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logoutAction),
            switchMap(() => {
                return this.authService.logout().pipe(
                    map(() => {
                        localStorage.removeItem('accessToken')
                        return logoutSuccessAction()
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })

    redirectAfterSubmit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutSuccessAction),
            tap(() =>
                this.router.navigateByUrl('/login')
            )
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}
