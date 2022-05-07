import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie.service';

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
  currentMovie : Movie | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      console.log()
      console.log('url' + this.router.url)
      if(paramMap.has('id')){
        this.movieService.getMovieDetails(Number.parseInt(paramMap.get('id')!))
          .subscribe(result => this.currentMovie = result)
      } else {
        this.router.navigate([''])
      }

    })
  }

}
