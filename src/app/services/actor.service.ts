import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActorDetails } from '../model/actor-detials.model';
import { MovieParticipation, SeriesParticipation } from '../model/actor-participation.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private BASE_URL = environment.BASE_URL
  constructor(private httpClient: HttpClient) { }

  /**
   * gets the details object of an actor
   * @param id id of the actor
   * @returns observable of ActorDetials data
   */
  getActorDetails(id: number){
    return this.httpClient.get<ActorDetails>(this.BASE_URL + `person/${id}?language=en-US`)
  }

  /**
   * gets the related movies of the actor
   * @param id id of the actor
   * @returns the movies of the actor
   */
  getMovieCreditsOfActor(id: number){
    return this.httpClient.get<MovieParticipation>(this.BASE_URL + `person/${id}/movie_credits?language=en-US`)
  }

  /**
   * gets the related series of the actor
   * @param id id of the actor
   * @returns the series of the actor
   */
  getSeriesCreditsOfActor(id: number){
    return this.httpClient.get<SeriesParticipation>(this.BASE_URL + `person/${id}/tv_credits?language=en-US`)
  }
}
