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
    private movieService: MovieService
  ) { }
  form!: FormGroup
  movies: Array<Movie> = []
  totalResults:number = 0
  pageEvent: PageEvent | undefined;
  pageSize = 20;
  pageIndex = 0;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null)
  })
    this.loadPageDetails()
    this.getDataFromServer()
  }

  /**
   * sets the pagination properties according to the event and refreshes the page
   * @param event pagination event like pageSize or pageIndex change
   * @returns the event it proceeded
   */
  public getServerData(event?:PageEvent){
    this.pageSize = event?.pageSize ?? 20
    this.pageIndex = event?.pageIndex ?? 0
    this.savePageDetails()
    this.getDataFromServer() 
    return event;
  }
  
  /**
   * calls the valid service function based on current pagination and search parameters
   */
  getDataFromServer(){
    let pageIndex = this.pageSize/20 * this.pageIndex
    let result: Observable<MovieResult[]>
    if(this.form != undefined && this.form.value != undefined && this.form?.value?.name != '' && this.form?.value?.name != null){
      result = this.movieService.getMoviesSearch(pageIndex,this.pageSize/20, this.form.value.name)
    } else {
      result = this.movieService.getTrendingMovies(pageIndex, this.pageSize/20)
    }
    result.subscribe(res => this.loadRecivedData(res))
  }

  /**
   * refreshes properies with the new data, also sets pagination values
   * @param result the array of movies returned by movie service
   */
  loadRecivedData(result: MovieResult[]){
    this.movies = []
    result.forEach(data => {
      if(this.movies.length == 0)
        this.movies = data.results
      else
        this.movies = this.movies.concat(data.results)
      this.totalResults = data.total_results
    })
  }

  /**
   * sets the page index to 0 and refreshes the page
   */
  onSearch(){
    this.pageIndex = 0
    this.savePageDetails()
    this.getDataFromServer()
  }

  /**
   * saves the current pagination data to localStorage
   */
  savePageDetails(){
    localStorage.setItem("moviePageIndex", this.pageIndex.toString())
    localStorage.setItem("moviePageSize", this.pageSize.toString())
    localStorage.setItem("moviePageQuerry", this.form.value.name ?? "")
  }

  /**
   * loads the saved pagination data from localStorage
   */
  loadPageDetails(){
    this.pageIndex = Number.parseInt(localStorage.getItem("moviePageIndex") ?? "0")
    this.pageSize = Number.parseInt(localStorage.getItem("moviePageSize") ?? "20" )
    this.form.value.name = localStorage.getItem("moviePageQuerry") ?? ""
    this.form.controls['name'].setValue(localStorage.getItem("moviePageQuerry") ?? "")
  }
  

}
