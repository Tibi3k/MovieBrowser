import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/model/actor.model';
import { Movie } from 'src/app/model/movie.model';
import { AllReviews, Review } from 'src/app/model/review.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  movie: any
  IMAGE_PATH = environment.IMAGE_ROUTE + 'w1280' 
  reviews: Review[] = []
  actors: Cast[] = []
  similarMovies: Movie[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      //gets the id from the param map, this movieId is required for the component
      if(paramMap.has('id')){
          let id: number = Number.parseInt(paramMap.get('id')!)
          this.getMovieDetails(id)
          this.getDisplayedReviews(id)
          this.getSimularMovies(id)
          this.getAllActorsOfMovie(id)
      } else {
        //movieId wasn't present, redirect to main page
        this.router.navigate([''])
      }
    })
  }

  /** 
   * navigates to the details panel of the given movie
   * @param id the id of the movie
  */
  onSimilarSelected(id: number){
    this.router.navigate(['moviedetails', id])
  }

  /**
   * loads the details of the given movie
   * @param id the id of the movie
   */
  private getMovieDetails(id: number){
    this.movieService.getMovieDetails(id)
    .subscribe(result => {this.movie = result; console.log(result)})
  }

  /**
   * loads maximum 10 reviews for the film
   * @param id the id of the movie
   */
  private getDisplayedReviews(id: number){
    this.movieService.getReviewsOfMovie(id)
    .subscribe(result => {this.reviews = result.results})
  }

  /**
   * loads all similar movies
   * @param id the id of the movie
   */
  private getSimularMovies(id: number){
    this.movieService.getSimilarMovie(id)
     .subscribe(results => this.similarMovies = results.results)
  }

  /**
   * loads every actor working on the given movie
   * @param id the id of the movie
   */
  private getAllActorsOfMovie(id: number){
    this.movieService.getCreditsOfMovie(id)
    .subscribe(result => {
      this.actors = result.cast
      .filter(member => member.known_for_department == 'Acting')
     })
  }

}
