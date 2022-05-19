
import { Attachment } from "./attachment";
import { Contact } from "./contact.model";
import { Customer } from "./customer";
import { Instruction } from "./instruction";
import { Procedure } from "./procedure";
import { Product } from "./product.model";
import { Provider } from "./provider";
import { Sector } from "./sector";
import { User } from "./user.model";
import {Cost} from "./Cost";

export class NonCompliance {
  id?: number;
  code: string;
  partnerId?: number;
  sector?: Sector;
  provider?: Provider;
  customer?: Customer;
  attachments: Attachment[] = [];
  costs: Cost[] = [];
  contacts: Contact[] = [];
  product: Product;
  partner: any;
  tipos_nc_item?: string = "";
  tipos_auditoria_item?: string = "";
  tipos_local_item?: string = "";
  data_abertura?: string = "";
  data_fechamento?: string = "";
  tipos_parceiro_item?: string = "";
  text_area_nc?: string = "";
  text_area_acoes?: string = "";
  quant_nc: number = 0;
  quant_total: number = 0;
  instruction?: Instruction;
  procedure?: Procedure;
  tipo_controle?: string = "";
  text_area_reject_point?: String = "";
  num_ordem_compra?: String = "";
  num_lote?: String = "";
  num_op?: String = "";
  num_nota?: String = "";
  radio_value: string = "val1";
  status?: string;
  issuer?:User
}
