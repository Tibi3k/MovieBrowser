import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieResult } from '../model/movie-result.model';
import { Movie } from '../model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private BASE_URL = environment.BASE_URL
  //https://api.themoviedb.org/3/trending/movie/week?api_key=5d4debbad690cb344669eba27c326e1c
  constructor(private httpClient: HttpClient) { }

  public getTrendingMovies(page: number, pagesToGet: number, category: string): Observable<MovieResult[]>{
    let results: Array<Observable<MovieResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      console.log('reeeee')
      console.log(pagesToGet)
      results.push(this.httpClient.get<MovieResult>(this.BASE_URL + `trending/${category}/week?api_key=${environment.API_KEY}&page=${page + 1 + i}`))
    }
    return forkJoin(results)
  }

  getMovieDetails(id: number){
    return this.httpClient.get<Movie>(this.BASE_URL + `movie/${id}`)
  }

  getSeriesDetails(id: number){
    return this.httpClient.get<Movie>(this.BASE_URL + `tv/${id}`)
  }
}
