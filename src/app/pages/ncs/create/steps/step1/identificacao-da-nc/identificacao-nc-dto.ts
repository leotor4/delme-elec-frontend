import { NonCompliance } from 'src/app/models/non-compliance';
import momentImported from 'moment'; 
const moment = momentImported;

export class IdentificacaoNCDTO {
  tipos_nc_item?: string = "";
  tipos_auditoria_item?: string = "";
  tipos_local_item: String = "";
  data_abertura?: Date;
  data_fechamento?: Date;
  data_abertura_str?: string;
  data_fechamento_str?: string;

  

  constructor(init?: Partial<NonCompliance>) {

    if (init) {
      Object.assign(this, init);
      if (init.hasOwnProperty('data_abertura') && this.data_abertura) {
        this.data_abertura = moment(init.data_abertura).toDate();
        this.data_abertura_str = moment(init.data_abertura).format('yyyy-MM-DD');
      }
      if (init.hasOwnProperty('data_fechamento') && this.data_fechamento) {
        this.data_fechamento = moment(init.data_fechamento).toDate();
        this.data_fechamento_str = moment(init.data_fechamento).format('yyyy-MM-DD');

      }

      if (init.tipos_local_item) {
        this.tipos_local_item = init.tipos_local_item
      }
      
    }
  }
}
