import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
          id: number;
          title: string;
          overview: string | null;
          poster_path: string | null;
          release_date: string | null;
          vote_average: number;
          vote_count: number;
          popularity: number;
          genre_ids: number[] | null;
        };
        Insert: {
          id?: number;
          title: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          vote_average?: number;
          vote_count?: number;
          popularity?: number;
          genre_ids?: number[] | null;
        };
        Update: {
          id?: number;
          title?: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          vote_average?: number;
          vote_count?: number;
          popularity?: number;
          genre_ids?: number[] | null;
        };
      };
    };
  };
};
