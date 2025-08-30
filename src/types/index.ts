import { z } from "zod";

/**
 * =================
 * Auth
 * =================
 */

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type AuthType = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<AuthType, "email" | "password">;

export type UserRegistrationForm = Pick<
  AuthType,
  "name" | "email" | "password" | "password_confirmation"
>;

export type RequestConfirmationCodeForm = Pick<AuthType, "email">;

export type ForgotPasswordForm = Pick<AuthType, "email">;

export type NewPasswordForm = Pick<
  AuthType,
  "password" | "password_confirmation"
>;

export type ConfirmToken = Pick<AuthType, "token">;

/**
 * =================
 * Users
 * =================
 */

export const userSchema = authSchema
  .pick({ name: true, email: true })
  .extend({ _id: z.string() });

export type User = z.infer<typeof userSchema>;

/**
 * =================
 * Projects
 * =================
 */

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  // @ts-expect-error: the library definition is wrong
  manager: z.string(userSchema.pick({ _id: true })),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

/**
 * =================
 * Notes
 * =================
 */

export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;

export type NoteFormData = Pick<Note, "content">;

/**
 * =================
 * Tasks
 * =================
 */

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      user: userSchema,
      status: taskStatusSchema,
      completedAt: z.string(),
      _id: z.string(),
    })
  ),
  notes: z.array(noteSchema.extend({ createdBy: userSchema })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, "name" | "description">;

/**
 * =================
 * Teams
 * =================
 */

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});

export type TeamMember = z.infer<typeof teamMemberSchema>;

export type TeamMemberForm = Pick<TeamMember, "email">;

export const teamMembersSchema = z.array(teamMemberSchema);
