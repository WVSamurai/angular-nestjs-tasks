import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { switchMap, map, tap, catchError, of } from 'rxjs'

import { registerAction, registerSuccessAction, registerFailAction } from './../actions/register.action'
import { AuthService } from './../../services/auth.service'

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService.register(request).pipe(
                    map(response => {
                        localStorage.setItem('accessToken', response.accessToken)
                        return registerSuccessAction({ user: response.user })
                    }),
                    catchError(
                        (errors: HttpErrorResponse) => of(registerFailAction({ errors: errors.error.message }))
                    )
                )
            })
        )
    })

    redirectAfterSubmit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerSuccessAction),
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