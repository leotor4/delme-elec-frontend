import { Sector } from "./sector";

export class User {
  id?: any;
  email?: string;
  password?: string;
  username?: string;
  matricula?: string;
  funcao?: string;
  sector?:Sector;
  created_at?: Date
  update_at?: Date
}
