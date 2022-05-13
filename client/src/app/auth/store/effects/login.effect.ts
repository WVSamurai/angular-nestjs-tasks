import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { switchMap, map, tap, catchError, of } from 'rxjs'

import { loginAction, loginSuccessAction, loginFailAction } from './../actions/login.action'
import { AuthService } from './../../services/auth.service'

@Injectable()
export class LoginEffect {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginAction),
            switchMap(({ request }) => {
                return this.authService.login(request).pipe(
                    map(response => {
                        localStorage.setItem('accessToken', response.accessToken)
                        return loginSuccessAction({ user: response.user })
                    }),
                    catchError(
                        (errors: HttpErrorResponse) => of(loginFailAction({ errors: errors.error.message }))
                    )
                )
            })
        )
    })

    redirectAfterSubmit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => this.router.navigateByUrl('/'))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {  }
}
