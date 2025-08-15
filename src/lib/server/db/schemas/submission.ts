import * as t from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";
import { assignments } from "./assignment";
export const rolesEnum = t.pgEnum("roles", ["student", "ta", "auditor"]);

export const submissions = t.pgTable('submissions', {
  id: t.text('id').primaryKey().default(sql`gen_random_uuid()`),
  assignmentId: t.text('assignment_id').references(() => assignments.id, { onDelete: 'cascade' }),
  userId: t.text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fileUrl: t.text('file_url'),
  text: t.text('text'),
  submittedAt: t.timestamp('submitted_at', { withTimezone: true }).default(sql`now()`),
  grade: t.integer('grade'),
  feedback: t.text('feedback'),
}, (table) => [
  t.index('assignment_user_index').on(table.assignmentId, table.userId),
]);

export type Submission = typeof submissions.$inferSelect;