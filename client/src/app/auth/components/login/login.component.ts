import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { loginAction } from './../../store/actions/login.action'
import { selectLoginErrors, selectIsSubmitting, selectIsLoggedIn } from './../../store/selectors'

import { LoginRequestInterface } from './../../types/loginRequest.interface'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'

type FormErrors = {
    email: ValidationErrors | undefined | null,
    password: ValidationErrors | undefined | null
}

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./../auth.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup
    isSubmitting$!: Observable<boolean>
    errors$!: Observable<string | null>
    validationErrors!: FormErrors

    constructor(
        private fb: FormBuilder,
        private store: Store<AppStateInterface>
    ) {}

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValues()
    }

    initializeForm(): void {
        this.form = this.fb.group({
            email: ['', [
                Validators.required, Validators.email
            ]],
            password: ['', [
                Validators.required, 
                Validators.minLength(8)
            ]]
        })
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting))
        this.errors$ = this.store.pipe(select(selectLoginErrors))
        this.validationErrors = {
            email: null,
            password: null
        }
    }

    onSubmit(): void {
        this.validationErrors = {
            email: this._emailErrors,
            password: this._passwordErrors
        }

        if (this.form.valid) {
            const request: LoginRequestInterface = this.form.value

            this.store.dispatch(loginAction({ request }))
        }
    }

    get _emailErrors() {
        return this.form.get('email')?.errors
    }

    get _passwordErrors() {
        return this.form.get('password')?.errors
    }
}
