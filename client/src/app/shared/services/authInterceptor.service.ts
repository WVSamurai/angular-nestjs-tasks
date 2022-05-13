import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, tap, retry } from 'rxjs'

import { AuthService } from 'src/app/auth/services/auth.service'

import { AppStateInterface } from '../types/appState.interface'

import { getUserSuccessAction } from 'src/app/auth/store/actions/user.action'
import { getUserFailAction } from './../../auth/store/actions/user.action'
import { logoutAction } from './../../auth/store/actions/logout.action'
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    isRetried: boolean = false
    loginUrl: string = environment.apiUrl + 'auth/login'

    constructor(
        private authService: AuthService,
        private store: Store<AppStateInterface>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('accessToken')

        req = req.clone({
            setHeaders: {
                Authorization: token ? `Bearer ${token}` : ''
            },
            withCredentials: true
        })

        return next.handle(req).pipe(
            tap({
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401 && !this.isRetried && req.url !== this.loginUrl) {
                            this.isRetried = true

                            this.authService.refresh().subscribe({
                                next: response => this.store.dispatch(
                                    getUserSuccessAction({ user: response.user })
                                ),
                                error: () => {
                                    localStorage.removeItem('accessToken')
                                    this.store.dispatch(getUserFailAction())
                                    this.store.dispatch(logoutAction())
                                }
                            })
                        }
                    }
                }
            })
        )
    }
}
