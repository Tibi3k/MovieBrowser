export interface Series {
    id: number;
    original_name: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    poster_path: string;
    vote_count: number;
    vote_average: number;
    first_air_date: string;
    name: string;
    overview: string;
    backdrop_path: string;
    popularity: number;
    media_type: string;
}

export interface SeriesResult {
    page: number;
    results: Series[];
    total_pages: number;
    total_results: number;
}