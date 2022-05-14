import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieResult } from 'src/app/model/movie-result.model';
import { Movie } from 'src/app/model/movie.model';
import { Series, SeriesResult } from 'src/app/model/series.model';
import { MovieService } from 'src/app/services/movie.service';
import { SeriesService } from 'src/app/services/series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: ['./list-series.component.css']
})
export class ListSeriesComponent implements OnInit {

  constructor(
    private seriesService: SeriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  form!: FormGroup
  series: Array<Series> = []
  totalResults:number = 0
  pageEvent: PageEvent | undefined;
  pageSize = 20;
  pageIndex = 0;
  queryString = ""

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null)
    })
    this.loadPageDetails()
    this.getDataFromServer()
  }

  /**
   * saves the page index and size on navigation event
   * @param event navigation event
   * @returns the current event
   */
  public getServerData(event?:PageEvent){
    this.pageSize = event?.pageSize ?? 20
    this.pageIndex = event?.pageIndex ?? 0
    this.savePageDetails()
    this.getDataFromServer() 
    return event;
  }
  
  /**
   * gets the series data form the API using page index and size and also the search word
   */
  getDataFromServer(){
    let pageIndex = this.pageSize/20 * this.pageIndex
    let result: Observable<SeriesResult[]>
    if(this.form != undefined && this.form.value != undefined && this.queryString != '' && this.queryString != null){
      result = this.seriesService.getSeriesSearch(pageIndex,this.pageSize/20, this.queryString)
    } else {
      result = this.seriesService.getTrendingSeries(pageIndex, this.pageSize/20)
    }
    result.subscribe(res => {
      this.series = []
      res.forEach(data => {
        console.log(data.results)
        if(this.series.length == 0)
          this.series = data.results
        else
          this.series = this.series.concat(data.results)
        this.totalResults = data.total_results
      })
    })
  }

  /**
   * refreshes the page with the new searchword
   */
  onSearch(){
    this.pageIndex = 0
    this.queryString = this.form.value.name
    this.getDataFromServer()
  }

  /**
 * saves the current pagination data to localStorage
 */
  savePageDetails() {
    localStorage.setItem("seriesPageIndex", this.pageIndex.toString())
    localStorage.setItem("seriesPageSize", this.pageSize.toString())
    localStorage.setItem("seriesPageQuerry", this.queryString ?? "")
  }

  /**
   * loads the saved pagination data from localStorage
   */
  loadPageDetails() {
    this.pageIndex = Number.parseInt(localStorage.getItem("seriesPageIndex") ?? "0")
    this.pageSize = Number.parseInt(localStorage.getItem("seriesPageSize") ?? "20")
    this.queryString = localStorage.getItem("seriesPageQuerry") ?? ""
    this.form.controls['name'].setValue(localStorage.getItem("seriesPageQuerry") ?? "")
  }

}

