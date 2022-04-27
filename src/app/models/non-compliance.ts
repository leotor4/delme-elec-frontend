import { Contact } from "./contact.model";

export class NonCompliance {
  id?: number;
  contacts: Contact[];
  tiposNcItem?: string = "";
  tiposAuditoriaItem?: string = "";
  tiposLocalItem?: string = "";
  dataAbertura?: string = "";
  dataFechamento?: string = "";
  tiposParceiroItem?: string = "";
  textAreaNc?: string = "";
  textAreaAcoes?: string = "";
}
