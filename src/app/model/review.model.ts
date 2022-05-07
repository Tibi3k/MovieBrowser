export interface AuthorDetails {
    name: string;
    username: string;
    avatar_path: string;
    rating?: number;
}

export interface Review {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: Date;
    id: string;
    updated_at: Date;
    url: string;
}

export interface AllReviews {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}