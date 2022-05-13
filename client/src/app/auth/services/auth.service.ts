import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { environment } from 'src/environments/environment'

import { LoginRequestInterface } from './../types/loginRequest.interface'
import { AuthResponseInterface } from './../../shared/types/authResponse.interface'
import { RegisterRequestInterface } from './../types/registerRequest.interface'

@Injectable()
export class AuthService {
    authUrl: string = environment.apiUrl + 'auth'

    constructor(private http: HttpClient) { }

    login(data: LoginRequestInterface): Observable<AuthResponseInterface> {
        const url = this.authUrl + '/login'

        return this.http.post<AuthResponseInterface>(url, data)
    }

    register(data: RegisterRequestInterface): Observable<AuthResponseInterface> {
        const url = this.authUrl + '/register'

        return this.http.post<AuthResponseInterface>(url, data)
    }

    logout(): Observable<any> {
        const url = this.authUrl + '/logout'

        return this.http.get(url)
    }

    refresh(): Observable<AuthResponseInterface> {
        const url = this.authUrl + '/refresh'

        return this.http.get<AuthResponseInterface>(url)
    }
}
