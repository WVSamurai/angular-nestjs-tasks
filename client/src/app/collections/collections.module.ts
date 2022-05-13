import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { CollectionsComponent } from './components/collections.component'

import { CollectionsEffect } from './store/effects/collections.effect'
import { TasksEffect } from './store/effects/tasks.effect'
import { CollectionsService } from './services/collections.service'
import { IsLoggedInGuard } from './../shared/guards/isLoggedIn.guard'

import { collectionsReducer } from './store/collections.reducer'

const routes: Routes = [
    {
        path: 'collections',
        component: CollectionsComponent,
        resolve: [IsLoggedInGuard]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([CollectionsEffect, TasksEffect]),
        StoreModule.forFeature('collections', collectionsReducer)
    ],
    declarations: [CollectionsComponent],
    providers: [CollectionsService]
})
export class CollectionsModule { }
