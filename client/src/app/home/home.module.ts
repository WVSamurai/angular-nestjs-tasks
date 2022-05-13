import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { TaskModule } from './../shared/modules/task/task.module'
import { HomeComponent } from './components/home.component'

import { IsLoggedInGuard } from './../shared/guards/isLoggedIn.guard'

const routes: Routes = [
    { path: 'home', component: HomeComponent, resolve: [IsLoggedInGuard] }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TaskModule
    ],
    declarations: [HomeComponent],
})
export class HomeModule {}