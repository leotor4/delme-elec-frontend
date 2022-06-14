import momentImported from 'moment'; 
import { NonCompliance } from 'src/app/models/non-compliance';

export class ParceiroNcDTO {
  tipos_nc_item?: string = "";
  tipos_auditoria_item?: string = "";
  tipos_local_item?: string = "";
  data_abertura?: string;
  data_fechamento?: string;

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
      Object.assign(this, init);
      console.log(this)
    }
  }
}
