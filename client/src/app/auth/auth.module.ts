import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'

import { AuthService } from './services/auth.service'

import { authReducer } from './store/auth.reducer'

import { LoginEffect } from './store/effects/login.effect'
import { RegisterEffect } from './store/effects/register.effect'
import { LogoutEffect } from './store/effects/logout.effect'
import { UserEffect } from './store/effects/user.effect'

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([
            LoginEffect,
            RegisterEffect,
            LogoutEffect,
            UserEffect
        ]),
        StoreModule.forFeature('auth', authReducer),
        ReactiveFormsModule,
    ],
    declarations: [LoginComponent, RegisterComponent],
    providers: [AuthService]
})
export class AuthModule {}
