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

  /**
   * fetches multiple pages and combines the result to a single observable of series
   * @param page the starting page for the fetch
   * @param pagesToGet the amount of pages needed
   * @returns  the tv shows
   */
  public getTrendingSeries(page: number, pagesToGet: number): Observable<SeriesResult[]>{
    let results: Array<Observable<SeriesResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      results.push(this.httpClient.get<SeriesResult>(this.BASE_URL + `trending/tv/week?page=${page + 1 + i}`))
    }
    return forkJoin(results)
  }

    /**
   * fetches the details of a single series
   * @param id the id of the series
   * @returns the details of the series
   */
  getSeriesDetails(id: number){
    return this.httpClient.get<Series>(this.BASE_URL + `tv/${id}`)
  }

  
  /**
   * simular to @function getTrendingSeries but also has a query option
   * fetches multiple pages and combines the result to a single observable of series
   * @param page the starting page for the fetch
   * @param pagesToGet the amount of pages needed
   * @param query the query for titles
   * @returns the matching series
   */
  getSeriesSearch(page: number, pagesToGet: number, query: string){
    let results: Array<Observable<SeriesResult>> = []
    for (let i = 0; i < pagesToGet; i++) {
      results.push(this.httpClient.get<SeriesResult>(this.BASE_URL +  `search/tv?page=${page + 1 + i}&language=en-US&include_adult=false&query=${query}`))
    }
    return forkJoin(results)
  }

    /**
   * fetches the reviews of a series
   * @param id the id of the series
   * @returns observable of reviews
   */
  getReviewsOfSeries(id: number){
    return this.httpClient.get<AllReviews>(this.BASE_URL + `tv/${id}/reviews?language=en-US&page=1`)
  }

    /**
   * gets the actors of a series
   * @param id the id of the series
   * @returns the actors
   */
  getCreditsOfSeries(id: number){
    return this.httpClient.get<ActorResults>(this.BASE_URL + `tv/${id}/credits?language=en-US`)
  }

    /**
   * returns similar series to the gived id
   * @param id the id of the series
   * @returns similar series
   */
  getSimilarSeries(id: number){
    return this.httpClient.get<SeriesResult>(this.BASE_URL + `/tv/${id}/similar?language=en-US&page=1`)
  }

  /**
   * gets the info on a season of a series
   * @param seriesId the id of the series
   * @param seasonNumber the season's number
   * @returns the seasons info
   */
  getSeasonDetails(seriesId: number, seasonNumber: number){
    return this.httpClient.get<Season>(this.BASE_URL + `/tv/${seriesId}/season/${seasonNumber}`)
  }

}
