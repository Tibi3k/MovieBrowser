import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorResults } from '../model/actor.model';
import { MovieResult } from '../model/movie-result.model';
import { Movie } from '../model/movie.model';
import { AllReviews } from '../model/review.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private BASE_URL = environment.BASE_URL
  constructor(private httpClient: HttpClient) { }

  public getTrendingMovies(page: number, pagesToGet: number): Observable<MovieResult[]>{
    let results: Array<Observable<MovieResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      console.log('reeeee')
      console.log(pagesToGet)
      results.push(this.httpClient.get<MovieResult>(this.BASE_URL + `trending/movie/week?page=${page + 1 + i}`))
    }
    return forkJoin(results)
  }

  getMovieDetails(id: number){
    return this.httpClient.get<Movie>(this.BASE_URL + `movie/${id}`)
  }

  getReviewsOfMovie(id: number){
    return this.httpClient.get<AllReviews>(this.BASE_URL + `movie/${id}/reviews?language=en-US&page=1`)
  }

  getCreditsOfMovie(id: number){
    return this.httpClient.get<ActorResults>(this.BASE_URL + `movie/${id}/credits?language=en-US`)
  }

  getMoviesSearch(page: number, pagesToGet: number, query:string): Observable<MovieResult[]>{
    let results: Array<Observable<MovieResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      results.push(this.httpClient.get<MovieResult>(this.BASE_URL + `search/movie?page=${page + 1 + i}&language=en-US&include_adult=false&query=${query}`))
    }
    return forkJoin(results)
  }

  getSimilarMovie(id: number){
    return this.httpClient.get<MovieResult>(this.BASE_URL + `/movie/${id}/similar?language=en-US&page=1`)
  }
}
