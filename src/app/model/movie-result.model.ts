import { Movie } from "./movie.model";

export interface MovieResult{
    page: number,
    results: Array<Movie>
    total_pages: number
    total_results: number
}