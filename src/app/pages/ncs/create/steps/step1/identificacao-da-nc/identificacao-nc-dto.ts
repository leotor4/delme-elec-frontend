import momentImported from 'moment'; 
import { NonCompliance } from 'src/app/models/non-compliance';
const moment = momentImported;

export class IdentificacaoNCDTO {
  tipos_nc_item?: string = "";
  tipos_auditoria_item?: string = "";
  tipos_local_item?: string = "";
  data_abertura?: string;
  data_fechamento?: string;

  

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
      Object.assign(this, init);
      if (init.hasOwnProperty('data_abertura') && this.data_abertura) {
        this.data_abertura = moment(init.data_abertura).format('yyyy-MM-DD');
      }
      if (init.hasOwnProperty('data_fechamento') && this.data_fechamento) {
        this.data_fechamento = moment(init.data_fechamento).format('yyyy-MM-DD');
      }
      console.log(this)
    }
  }
}
