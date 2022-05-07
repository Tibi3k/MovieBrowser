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
    let result: Observable<SeriesResult[]>
    if(this.form != undefined && this.form.value != undefined && this.form?.value?.name != '' && this.form?.value?.name != null){
      result = this.seriesService.getSeriesSearch(pageIndex,this.pageSize/20, this.form.value.name)
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

  onSelectionChanged(){
    this.getDataFromServer()
  }

  onSearch(){
    this.pageIndex = 0
    this.getDataFromServer()
  }

}

