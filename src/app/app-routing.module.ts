import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/pages/details/details.component';
import { ListMoviesComponent } from './components/pages/list-movies/list-movies.component';

const routes: Routes = [
  {path: '', component: ListMoviesComponent},
  {path: 'moviedetails/:id', component: DetailsComponent},
  {path: 'seriesdetails/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
