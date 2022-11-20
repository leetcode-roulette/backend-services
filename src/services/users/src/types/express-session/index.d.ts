import { Session as User } from "types/custom";
export {};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
