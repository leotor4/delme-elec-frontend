import { IdentificacaoNCDTO } from './../pages/ncs/create/steps/step1/identificacao-da-nc/identificacao-nc-dto';

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
import momentImported from 'moment'; 
import { ProposalSolution } from './proposal-solution';
import {SgqEval} from "./SgqEval";
import {Closing} from "./closing";
const moment = momentImported;

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
  sgqEvaluation: SgqEval;
  closing: Closing;
  partner: any;
  tipos_nc_item?: string = "";
  tipos_auditoria_item?: string = "";
  tipos_local_item?: string = "";
  data_abertura?: Date;
  data_fechamento?: Date;
  tipos_parceiro_item?: string = "";
  text_area_nc?: string = "";
  text_area_acoes?: string = "";
  quant_nc: number = 0;
  quant_total: number = 0;
  instruction?: Instruction;
  procedure?: Procedure;
  tipo_controle?: string = "";
  text_area_reject_point?: string = "";
  num_ordem_compra?: string = "";
  num_lote?: string = "";
  num_op?: string = "";
  num_nota?: string = "";
  radio_value: string = "val1";
  status?: string;
  system_status?: string;
  issuer?: User;
  emissor?: User;
  affected_sector?: Sector;
  proposalSolution?: ProposalSolution;
  created_at?: Date;

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  public adicionar_campos(novos_campos: Partial<IdentificacaoNCDTO>) {
    if (novos_campos) {
      Object.assign(this, novos_campos);

      if (novos_campos.hasOwnProperty("data_abertura")) {
        this.data_abertura = moment(novos_campos.data_abertura).toDate();
      }
      if (novos_campos.hasOwnProperty("data_fechamento")) {
        this.data_fechamento = moment(novos_campos.data_fechamento).toDate();
      }
    }
  }
}
