import { Sector } from "./sector";

export class User {
  id?: any;
  email?: string;
  password?: string;
  username?: string;
  matricula?: string;
  funcao?: string;
  setor?:Sector;
  created_at?: Date
  update_at?: Date
}
