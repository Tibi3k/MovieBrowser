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
      console.log()
      console.log('url' + this.router.url)
      if(paramMap.has('id')){
          let id: number = Number.parseInt(paramMap.get('id')!)
          this.movieService.getMovieDetails(id)
          .subscribe(result => {this.movie = result; console.log(result)})
          this.movieService.getReviewsOfMovie(id)
           .subscribe(result => {this.reviews = result.results})
          this.movieService.getSimilarMovie(id)
            .subscribe(results => this.similarMovies = results.results)
           this.movieService.getCreditsOfMovie(id)
           .subscribe(result => {
             this.actors = result.cast
             .filter(member => member.known_for_department == 'Acting')
            })
        
      } else {
        this.router.navigate([''])
      }
    })
  }

  onSimilarSelected(id: number){
    this.router.navigate(['moviedetails', id])
  }

}
