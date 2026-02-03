import * as t from "drizzle-orm/pg-core";
import { users } from "./user";
import { sql } from "drizzle-orm";

export const courses = t.pgTable('courses', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  code: t.text('code').unique(),
  title: t.text('title').notNull(),
  description: t.text('description'),
  instructorId: t.text('instructor_id').references(() => users.id),
  published: t.boolean('published').default(false),
  createdAt: t.timestamp('created_at', { withTimezone: true }).default(sql`now()`),
  updatedAt: t.timestamp('updated_at', { withTimezone: true }).default(sql`now()`),
});

export const courseModules = t.pgTable('course_modules', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  courseId: t.text('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  title: t.text('title').notNull(),
  position: t.integer('position').default(0),
});

export type Course = typeof courses.$inferSelect;
export type CourseModule = typeof courseModules.$inferSelect;