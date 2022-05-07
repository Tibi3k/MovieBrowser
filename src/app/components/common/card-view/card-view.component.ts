import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  constructor(private router: Router) { }
  IMAGE_PATH = environment.IMAGE_ROUTE + 'w500' 

  ngOnInit(): void {
  }

  @Input()
  type: string = ""

  @Input()
  id: number = 0

  @Input()
  releaseDate: string = ""

  @Input()
  rating: number = 0

  @Input()
  title: string = ""

  @Input()
  imagePath: string = ""

  @Input()
  overview: string = ""



  onMovieSelected(){
    if(this.type == 'movie')
      this.router.navigate(['moviedetails', this.id])
    else
      this.router.navigate(['seriesdetails', this.id])
  }

  convertRatingToString(rating: Number){
    return rating == 0 ?  '-' : rating
  }

  getImagePath(path : string | null): string{
    if(path == null)
      return "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-800x800.jpg"
    else
      return this.IMAGE_PATH + path
  }
}
