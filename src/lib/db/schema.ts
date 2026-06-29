import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  decimal,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  overview: text("overview"),
  posterPath: varchar("poster_path", { length: 500 }),
  releaseDate: varchar("release_date", { length: 10 }),
  voteAverage: decimal("vote_average", { precision: 3, scale: 1 }),
  voteCount: integer("vote_count").default(0),
  popularity: decimal("popularity", { precision: 10, scale: 2 }).default(0),
  genreIds: jsonb("genre_ids").$type<number[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  tmdbId: integer("tmdb_id").unique(),
});

export const movieGenres = pgTable(
  "movie_genres",
  {
    id: serial("id").primaryKey(),
    movieId: integer("movie_id")
      .references(() => movies.id)
      .notNull(),
    genreId: integer("genre_id")
      .references(() => genres.id)
      .notNull(),
  },
  (table) => ({
    movieGenreIdx: index("movie_genre_idx").on(table.movieId, table.genreId),
  })
);

import { index } from "drizzle-orm/pg-core";

export type Movie = typeof movies.$inferSelect;
export type NewMovie = typeof movies.$inferInsert;
export type Genre = typeof genres.$inferSelect;
export type NewGenre = typeof genres.$inferInsert;
