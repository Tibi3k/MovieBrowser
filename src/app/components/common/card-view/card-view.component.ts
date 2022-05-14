import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent  {

  constructor(private router: Router) { }
  IMAGE_PATH = environment.IMAGE_ROUTE + 'w500' 

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



  /**
   * navigates to a details page based on the the type input of the component
   * currently supports movie and series
   */
  onMovieSelected(){
    if(this.type == 'movie'){
      this.router.navigate(['moviedetails', this.id])
    }
    else
      this.router.navigate(['seriesdetails', this.id])
  }

  /**
   * retuns the rating in string format or '-' if rating was 0
   * @param rating the rating to convert
   * @returns the rating in string or default value
   */
  convertRatingToString(rating: Number){
    return rating == 0 ?  '-' : rating
  }

  /**
   * returns the picture associated with the path or a default picture if path is null
   * @param path end of url path with .jpg ending
   * @returns a full path to the picture or to a default picture
   */
  getImagePath(path : string | null): string{
    if(path == null)
      return "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-800x800.jpg"
    else
      return this.IMAGE_PATH + path
  }
}
