import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDetails } from 'src/app/model/actor-detials.model';
import { MovieParticipation, SeriesParticipation } from 'src/app/model/actor-participation.model';
import { ActorService } from 'src/app/services/actor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  IMAGE_PATH = environment.IMAGE_ROUTE + 'h632' 
  actorDetails: ActorDetails | null = null
  actorMovieParticipations: MovieParticipation | null = null
  actorSeriesParticipations: SeriesParticipation | null = null
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if(paramMap.has('actorId')){
        let actorId = Number.parseInt(paramMap.get('actorId')!)
        this.actorService.getActorDetails(actorId)
          .subscribe(details => {this.actorDetails = details; console.log(this.actorDetails)})
        this.actorService.getMovieCreditsOfActor(actorId)
          .subscribe(details => this.actorMovieParticipations = details)
        this.actorService.getSeriesCreditsOfActor(actorId)
          .subscribe(details => this.actorSeriesParticipations = details)
      } else {
        this.router.navigate([''])
      }
    })
  }

}
