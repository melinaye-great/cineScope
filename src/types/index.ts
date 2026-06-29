// Movie types
export interface Movie {
  id: number;
  title: string;
  overview: string | null;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genreIds: number[] | null;
}

// Genre types
export interface Genre {
  id: number;
  name: string;
  tmdbId: number | null;
}

// Movie with details
export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  budget: number | null;
  revenue: number | null;
}

// Chart data types
export interface ChartDataItem {
  name: string;
  value: number;
}

export interface RatingDistribution {
  range: string;
  count: number;
}

export interface GenreStats {
  genre: string;
  count: number;
  avgRating: number;
}

// API Response types
export interface TmdbSearchResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

// Dashboard stats
export interface DashboardStats {
  totalMovies: number;
  totalGenres: number;
  avgRating: number;
  topRatedMovie: Movie | null;
}
