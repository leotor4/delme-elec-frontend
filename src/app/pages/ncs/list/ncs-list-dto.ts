import { ObjectUtils } from './../../../utils/object-utils';
import { NonCompliance } from 'src/app/models/non-compliance';
import momentImported from 'moment'; 
const moment = momentImported;

export class NcsListDTO {
  numero: string = "";
  parceiro: string = "";
  emissor: string = "";
  status: string;
  tipos_nc_item:string;
  tipos_auditoria_item:string;
  system_status:string;
  data_abertura:Date;
  data_fechamento:Date;
  tipos_local_item:string;
  prazo:number;

  nc: NonCompliance = new NonCompliance() ;

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
        Object.assign(this.nc, init)
        this.numero = ObjectUtils.buscarValor(init, 'code', '')
        this.emissor = ObjectUtils.buscarValor(init, 'emissor.username', '')
        this.status = ObjectUtils.buscarValor(init, 'status', '')
        this.system_status = ObjectUtils.buscarValor(init, 'system_status', '')
        this.tipos_nc_item = ObjectUtils.buscarValor(init, 'tipos_nc_item', '')
        this.tipos_auditoria_item = ObjectUtils.buscarValor(init, 'tipos_auditoria_item', '')
        


        if (init.data_abertura && init.data_fechamento) {
          this.data_abertura = new Date(init.data_abertura);
          this.data_fechamento = new Date(init.data_fechamento);
          this.prazo = this.getPrazo(init.data_abertura, init.data_fechamento);
        }

        this.tipos_local_item = ObjectUtils.buscarValor(init, 'sector.name', '')
        this.parceiro = this.getParceiro()
        
    }
  }

  private getParceiro():string {
    
    switch (this.nc.tipos_parceiro_item?.toUpperCase()) {
      case 'INTERNO':
        return ObjectUtils.buscarValor(this.nc, 'sector.name', ''); 
      case 'CLIENTE':
        return ObjectUtils.buscarValor(this.nc, 'customer.fantasy_name', ''); 
      case 'FORNECEDOR':
        return ObjectUtils.buscarValor(this.nc, 'provider.fantasy_name', ''); 
      default:
        return 'Não foi possível obter o parceiro'
    }
  }

  private getPrazo(data_abertura:Date, data_fechamento:Date):number {
    var start = moment(data_abertura);
    var end = moment(data_fechamento);
    var now = moment(new Date())

    var numDays = moment.duration(now.diff(end)).asDays();

    var prazoEsgotado = numDays < 0
    return Math.trunc(prazoEsgotado ? (numDays * -1) : numDays)
    
  }

}
