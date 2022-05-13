import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module'
import { AuthModule } from './auth/auth.module'
import { NavbarModule } from './shared/modules/navbar/navbar.module'
import { HomeModule } from './home/home.module'
import { CollectionsModule } from './collections/collections.module'
import { CollectionModule } from './collection/collection.module'
import { NotFoundModule } from './shared/modules/not-found/not-found.module' 

import { AuthInterceptor } from './shared/services/authInterceptor.service'

import { AppComponent } from './app.component'

import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    AuthModule,
    NavbarModule,
    HomeModule,
    CollectionsModule,
    CollectionModule,
    NotFoundModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
