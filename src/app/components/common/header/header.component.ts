import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router){}

  /**
   * navigates to the movies page and clears local storage
   */
  navigateToMoviePage(){
    this.clearMoviePageDetails()
    this.router.navigate(['']);
  }

  /**
   * navigates to the series page and clears local storage
   */
  navigateToSeriesPage(){
    this.clearSeriesPageDetails()
    this.router.navigate(['series'])
  }

  /**
   * clears all local storage data related to movies
   */
  clearMoviePageDetails(){
    localStorage.removeItem("moviePageIndex")
    localStorage.removeItem("moviePageSize")
    localStorage.removeItem("moviePageQuerry")
  }

  /**
   * clears all local storage data related to series
   */
  clearSeriesPageDetails(){
    localStorage.removeItem("seriesPageIndex")
    localStorage.removeItem("seriesPageSize")
    localStorage.removeItem("seriesPageQuerry")
  }
 }
