import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorResults } from '../model/actor.model';
import { AllReviews } from '../model/review.model';
import { Season } from '../model/season-details.model';
import { Series, SeriesResult } from '../model/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private httpClient: HttpClient) { }
  private BASE_URL = environment.BASE_URL

  public getTrendingSeries(page: number, pagesToGet: number): Observable<SeriesResult[]>{
    let results: Array<Observable<SeriesResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      results.push(this.httpClient.get<SeriesResult>(this.BASE_URL + `trending/tv/week?page=${page + 1 + i}`))
    }
    return forkJoin(results)
  }

  getSeriesDetails(id: number){
    return this.httpClient.get<Series>(this.BASE_URL + `tv/${id}`)
  }

  getSeriesSearch(page: number, pagesToGet: number, query: string){
    let results: Array<Observable<SeriesResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      results.push(this.httpClient.get<SeriesResult>(this.BASE_URL +  `search/tv?page=${page + 1 + i}&language=en-US&include_adult=false&query=${query}`))
    }
    return forkJoin(results)
  }

  getReviewsOfSeries(id: number){
    return this.httpClient.get<AllReviews>(this.BASE_URL + `tv/${id}/reviews?language=en-US&page=1`)
  }

  getCreditsOfSeries(id: number){
    return this.httpClient.get<ActorResults>(this.BASE_URL + `tv/${id}/credits?language=en-US`)
  }

  getSimilarSeries(id: number){
    return this.httpClient.get<SeriesResult>(this.BASE_URL + `/tv/${id}/similar?language=en-US&page=1`)
  }

  getSeasonDetails(seriesId: number, seasonNumber: number){
    return this.httpClient.get<Season>(this.BASE_URL + `/tv/${seriesId}/season/${seasonNumber}`)
  }

}
