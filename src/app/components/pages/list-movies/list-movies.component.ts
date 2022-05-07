import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieResult } from 'src/app/model/movie-result.model';
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
  form!: FormGroup
  movies: Array<Movie> = []
  totalResults:number = 0
  pageEvent: PageEvent | undefined;
  pageSize = 20;
  pageIndex = 0;

  ngOnInit(): void {
    this.getDataFromServer()
    this.form = new FormGroup({
      name: new FormControl(null)
  })
  }

  public getServerData(event?:PageEvent){
    this.pageSize = event?.pageSize ?? 20
    this.pageIndex = event?.pageIndex ?? 0
    this.getDataFromServer() 
    return event;
  }
  
  getDataFromServer(){
    let pageIndex = this.pageSize/20 * this.pageIndex
    let result: Observable<MovieResult[]>
    if(this.form != undefined && this.form.value != undefined && this.form?.value?.name != '' && this.form?.value?.name != null){
      result = this.movieService.getMoviesSearch(pageIndex,this.pageSize/20, this.form.value.name)
    } else {
      result = this.movieService.getTrendingMovies(pageIndex, this.pageSize/20)
    }
    result.subscribe(res => {
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

  onSearch(){
    this.pageIndex = 0
    this.getDataFromServer()
  }

}
