import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export type User = typeof users.$inferSelect;