import { Attachment } from "./attachment";
import { Contact } from "./contact.model";
import { Instruction } from "./instruction";
import { Procedure } from "./procedure";
import { Product } from "./product.model";

export class NonCompliance {
  id?: number;
  partnerId?: number;
  attachments: Attachment[] = [];
  contacts: Contact[] = [];
  product: Product;
  partner: any;
  tiposNcItem?: string = "";
  tiposAuditoriaItem?: string = "";
  tiposLocalItem?: string = "";
  dataAbertura?: string = "";
  dataFechamento?: string = "";
  tiposParceiroItem?: string = "";
  textAreaNc?: string = "";
  textAreaAcoes?: string = "";
  quantNc: number = 0;
  quantTotal: number = 0;
  instruction: Instruction;
  procedure: Procedure;
  tipoControle?: string = "";
  textAreaRejectPoint?: String = "";
  numOrdemCompra?: String = "";
  numLote?: String = "";
  numOp?: String = "";
  numNota?: String = "";
  radioValue: string = "val1";
}
