import { Attachment } from "./attachment";
import { Contact } from "./contact.model";

export class NonCompliance {
  id?: number;
  partnerId?: number;
  attachments: Attachment[] = [];
  contacts: Contact[] = [];
  tiposNcItem?: string = "";
  tiposAuditoriaItem?: string = "";
  tiposLocalItem?: string = "";
  dataAbertura?: string = "";
  dataFechamento?: string = "";
  tiposParceiroItem?: string = "";
  textAreaNc?: string = "";
  textAreaAcoes?: string = "";
}
