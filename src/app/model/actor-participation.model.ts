export interface Cast {
    vote_average: number;
    overview: string;
    release_date: string;
    adult: boolean;
    backdrop_path: string;
    vote_count: number;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    poster_path: string;
    title: string;
    video: boolean;
    popularity: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface MovieParticipation {
    cast: Cast[];
    crew: any[];
    id: number;
}

export interface SeriesCast {
    original_name: string;
    id: number;
    name: string;
    vote_count: number;
    vote_average: number;
    first_air_date: string;
    poster_path: string;
    genre_ids: number[];
    original_language: string;
    backdrop_path: string;
    overview: string;
    origin_country: string[];
    popularity: number;
    character: string;
    credit_id: string;
    episode_count: number;
}

export interface SeriesParticipation {
    cast: SeriesCast[];
    crew: any[];
    id: number;
}
