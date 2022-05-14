import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Season } from 'src/app/model/season-details.model';
import { SeriesService } from 'src/app/services/series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-season-details',
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.css']
})
export class SeasonDetailsComponent implements OnInit {

  constructor(
    private seriesService: SeriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  season: Season | null = null
  IMAGE_PATH = environment.IMAGE_ROUTE

  /**
   * reads the series id from the URL and gets the details, navigate to main page if id does not exists
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if(paramMap.has('seriesId') && paramMap.has('seasonNumber')){
        let seriesId = Number.parseInt(paramMap.get('seriesId')!)
        let seasonNumber = Number.parseInt(paramMap.get('seasonNumber')!)
        this.seriesService.getSeasonDetails(seriesId, seasonNumber)
          .subscribe(season => {this.season = season; console.log(this.season)})
      } else {
        this.router.navigate([''])
      }
    })

  }

}
