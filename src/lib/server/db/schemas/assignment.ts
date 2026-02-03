import * as t from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { courses } from "./course";
export const rolesEnum = t.pgEnum("roles", ["student", "ta", "auditor"]);

export const assignments = t.pgTable('assignments', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  courseId: t.text('course_id').references(() => courses.id),
  title: t.text('title').notNull(),
  description: t.text('description'),
  dueAt: t.timestamp('due_at', { withTimezone: true }),
  maxScore: t.integer('max_score').default(100),
  createdAt: t.timestamp('created_at', { withTimezone: true }).default(sql`now()`),
}, (table) => [
  t.index('course_id_index').on(table.courseId),
]);

export type Assignment = typeof assignments.$inferSelect;