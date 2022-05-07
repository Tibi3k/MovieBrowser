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
import { CardViewComponent } from './components/common/card-view/card-view.component';
import { ListSeriesComponent } from './components/pages/list-series/list-series.component';
import { SeriesDetailsComponent } from './components/pages/series-details/series-details.component';
import { ActorDetailsComponent } from './components/pages/actor-details/actor-details.component';
import { SeasonDetailsComponent } from './components/pages/season-details/season-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListMoviesComponent,
    DiscoverComponent,
    DetailsComponent,
    CardViewComponent,
    ListSeriesComponent,
    SeriesDetailsComponent,
    ActorDetailsComponent,
    SeasonDetailsComponent
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
