import { User } from "firebase/auth";

export interface Role {
  role: string;
}
export interface CustomUser extends User {
  isAdmin: boolean;
}
