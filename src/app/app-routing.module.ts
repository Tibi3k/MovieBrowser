import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailsComponent } from './components/pages/actor-details/actor-details.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { ListMoviesComponent } from './components/pages/list-movies/list-movies.component';
import { ListSeriesComponent } from './components/pages/list-series/list-series.component';
import { SeasonDetailsComponent } from './components/pages/season-details/season-details.component';
import { SeriesDetailsComponent } from './components/pages/series-details/series-details.component';

const routes: Routes = [
  { path: '', component: ListMoviesComponent },
  { path: 'series', component: ListSeriesComponent  },
  { path: 'moviedetails/:id', component: DetailsComponent },
  { path: 'seriesdetails/:id', component: SeriesDetailsComponent },
  { path: 'actordetials/:actorId', component: ActorDetailsComponent },
  { path: 'seasondetails/:seriesId/:seasonNumber', component: SeasonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
