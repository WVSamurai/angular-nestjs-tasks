import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { registerAction } from './../../store/actions/register.action'
import { selectRegisterErrors, selectIsSubmitting } from './../../store/selectors'

import { AppStateInterface } from './../../../shared/types/appState.interface'
import { RegisterRequestInterface } from './../../types/registerRequest.interface'

type FormErrors = {
    username: ValidationErrors | undefined | null,
    email: ValidationErrors | undefined | null,
    password: ValidationErrors | undefined | null
}

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.scss']
})
export class RegisterComponent {
    form!: FormGroup
    isSubmitting$!: Observable<boolean>
    errors$!: Observable<string | null>
    validationErrors!: FormErrors

    constructor(
        private fb: FormBuilder,
        private store: Store<AppStateInterface>
    ) { }

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValues()
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['', [
                Validators.required,
                Validators.pattern(/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
            ]],
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
        this.errors$ = this.store.pipe(select(selectRegisterErrors))
        this.validationErrors = {
            username: null,
            email: null,
            password: null
        }
    }

    onSubmit(): void {
        this.validationErrors = {
            username: this._usernameErrors,
            email: this._emailErrors,
            password: this._passwordErrors
        }

        if (this.form.valid) {
            const request: RegisterRequestInterface = this.form.value

            this.store.dispatch(registerAction({ request }))
        }
    }

    get _usernameErrors() {
        return this.form.get('username')?.errors
    }

    get _emailErrors() {
        return this.form.get('email')?.errors
    }

    get _passwordErrors() {
        return this.form.get('password')?.errors
    }
}
