import { assignments } from "./schemas/assignment";
import { courseModules, courses } from "./schemas/course";
import { enrollments } from "./schemas/enrolement";
import { lessonProgress, lessons } from "./schemas/lesson";
import { sessions } from "./schemas/session";
import { submissions } from "./schemas/submission";
import { users } from "./schemas/user";

export const schemas = {
	users,
	sessions,
	lessons,
	lessonProgress,
	courses,
	courseModules,
	assignments,
	submissions,
	enrollments,
}