import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  IMAGE_PATH = environment.IMAGE_ROUTE + 'w500' 
  movies: Array<Movie> = []
  totalResults:number = 0
  pageEvent: PageEvent | undefined;
  pageSize = 20;
  pageIndex = 0;
  category = 'all'

  ngOnInit(): void {
    this.getDataFromServer()
  }

  convertRatingToString(rating: Number){
    return rating == 0 ?  '-' : rating
  }

  onMovieSelected(id: Number, date: string | undefined){
    if(date == undefined)
      this.router.navigate(['moviedetails', id])
    else
      this.router.navigate(['seriesdetails', id])
  }

  public getServerData(event?:PageEvent){
    this.pageSize = event?.pageSize ?? 20
    this.pageIndex = event?.pageIndex ?? 0
    this.getDataFromServer() 
    return event;
  }
  
  getDataFromServer(){
    let pageIndex = this.pageSize/20 * this.pageIndex
    this.movieService.getTrendingMovies(pageIndex, this.pageSize/20, this.category)
    .subscribe(res => {
      this.movies = []
      res.forEach(data => {
        console.log(data.results)
        if(this.movies.length == 0)
          this.movies = data.results
        else
          this.movies = this.movies.concat(data.results)
        this.totalResults = data.total_results
      })
    })
  }

  onSelectionChanged(){
    this.getDataFromServer()
  }

}
