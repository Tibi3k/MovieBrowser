import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cast } from 'src/app/model/actor.model';
import { Review } from 'src/app/model/review.model';
import { Series } from 'src/app/model/series.model';
import { SeriesService } from 'src/app/services/series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css']
})
export class SeriesDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seriesService: SeriesService
  ) { }

  IMAGE_PATH = environment.IMAGE_ROUTE + 'w1280' 
  series: any
  reviews: Review[] = []
  actors: Cast[] = []
  similarShows:Series[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      console.log()
      console.log('url' + this.router.url)
      if(paramMap.has('id')){
        let id: number = Number.parseInt(paramMap.get('id')!)
        this.seriesService.getSeriesDetails(id)
          .subscribe(result => {this.series = result; console.log(result)})
        this.seriesService.getReviewsOfSeries(id)
           .subscribe(result => {this.reviews = result.results})
        this.seriesService.getSimilarSeries(id)
           .subscribe(results => this.similarShows = results.results)
        this.seriesService.getCreditsOfSeries(id)
           .subscribe(result => {
          this.actors = result.cast.filter(member => member.known_for_department == 'Acting')
            })
      } else {
        this.router.navigate([''])
      }
    })
  }

  /**
   * navigates to a different series details page
   * @param id the id of the series
   */
  onSimilarSelected(id: number){
    this.router.navigate(['seriesdetails', id])
  }

}