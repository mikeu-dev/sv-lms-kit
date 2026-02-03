import * as t from "drizzle-orm/pg-core";
import { courseModules } from "./course";
import { sql } from "drizzle-orm";
import { users } from "./user";

export const statusEnum = t.pgEnum("status", ["not_started", "in_progress", "completed"]);

export const lessons = t.pgTable('lessons', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  moduleId: t.text('module_id').references(() => courseModules.id, { onDelete: 'cascade' }),
  title: t.text('title').notNull(),
  content: t.text('content'),
  resourceUrl: t.text('resource_url'),
  duration: t.integer('duration'),
  position: t.integer('position').default(0),
  createdAt: t.timestamp('created_at', { withTimezone: true }).default(sql`now()`),
}, (table) => [
  t.index('module_index').on(table.moduleId),
]);

export const lessonProgress = t.pgTable('lesson_progress', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: t.text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  lessonId: t.text('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  status: statusEnum().default('not_started'), 
  updatedAt: t.timestamp('updated_at', { withTimezone: true }).default(sql`now()`),
}, (table) => [
  t.index('user_lesson_index').on(table.userId, table.lessonId),
]);

export type Lesson = typeof lessons.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;