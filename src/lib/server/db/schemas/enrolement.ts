import * as t from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";
import { courses } from "./course";
export const rolesEnum = t.pgEnum("roles", ["student", "ta", "auditor"]);

export const enrollments = t.pgTable('enrollments', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: t.text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  courseId: t.text('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  role: rolesEnum().default('student'), 
  enrolledAt: t.timestamp('enrolled_at', { withTimezone: true }).default(sql`now()`),
}, (table) => [
  t.index('user_course_unique_index').on(table.userId, table.courseId),
]);

export type Enrollment = typeof enrollments.$inferSelect;