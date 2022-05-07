import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ListMoviesComponent } from './components/pages/list-movies/list-movies.component';
import { DiscoverComponent } from './components/pages/discover/discover.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { ApiKeyInterceptor } from './services/api-key.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListMoviesComponent,
    DiscoverComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
