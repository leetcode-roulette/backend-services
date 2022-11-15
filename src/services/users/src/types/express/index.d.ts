import { User, Session } from "types/custom";
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      session?: Session;
    }
  }
}
