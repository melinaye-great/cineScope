import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  date,
  unique,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  status: text("status").default("upcoming"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wishData = pgTable(
  "wish_data",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    movieId: uuid("movie_id")
      .references(() => movies.id, { onDelete: "cascade" })
      .notNull(),
    platform: text("platform").notNull(),
    wishCount: integer("wish_count").notNull(),
    dailyIncrement: integer("daily_increment").default(0),
    snapshotDate: date("snapshot_date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueSnapshot: unique().on(table.movieId, table.platform, table.snapshotDate),
  })
);

export type Movie = typeof movies.$inferSelect;
export type NewMovie = typeof movies.$inferInsert;
export type WishData = typeof wishData.$inferSelect;
export type NewWishData = typeof wishData.$inferInsert;
