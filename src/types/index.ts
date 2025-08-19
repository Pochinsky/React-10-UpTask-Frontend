import { z } from "zod";

/** Auth & Users */

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

/** Projects */

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
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
  })
);

/** Tasks */

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
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, "name" | "description">;
