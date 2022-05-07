export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string | undefined;
    overview: string;
    poster_path: string;
    release_date: string | undefined;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
    name: string
    original_name: string | undefined,
    first_air_date: string | undefined;

}