import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { TaskModule } from 'src/app/shared/modules/task/task.module'
import { NotFoundModule } from '../shared/modules/not-found/not-found.module'

import { CollectionComponent } from './components/collection.component'

import { IsLoggedInGuard } from './../shared/guards/isLoggedIn.guard'

const routes: Routes = [
    { 
        path: 'collections/:id',
        component: CollectionComponent,
        resolve: [IsLoggedInGuard]
    },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TaskModule,
        NotFoundModule
    ],
    declarations: [CollectionComponent]
})
export class CollectionModule {}
