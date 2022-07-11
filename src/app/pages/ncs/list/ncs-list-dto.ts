import { ObjectUtils } from './../../../utils/object-utils';
import { NonCompliance } from 'src/app/models/non-compliance';
import momentImported from 'moment'; 
const moment = momentImported;

export class NcsListDTO {
  id : number;
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
  dsc_produto: string;
  prazo:number;

  nc: NonCompliance = new NonCompliance() ;

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
        Object.assign(this.nc, init)

        
        this.id = ObjectUtils.buscarValor(init, 'id', '')
        this.numero = ObjectUtils.buscarValor(init, 'code', '')
        this.emissor = ObjectUtils.buscarValor(init, 'emissor.username', '')
        this.status = ObjectUtils.buscarValor(init, 'status', '')
        this.system_status = ObjectUtils.buscarValor(init, 'system_status', '')
        this.tipos_nc_item = ObjectUtils.buscarValor(init, 'tipos_nc_item', '')
        this.tipos_auditoria_item = ObjectUtils.buscarValor(init, 'tipos_auditoria_item', '')
        this.tipos_local_item = ObjectUtils.buscarValor(init, 'tipos_local_item', '')
        this.dsc_produto = ObjectUtils.buscarValor(init, 'product.description', '')


        if (init.created_at && init.data_fechamento) {
          
          this.data_abertura = new Date(init.created_at);
          this.data_fechamento = new Date(init.data_fechamento);


          if (this.status != "canceled" && this.status != "closed") {
            this.prazo = this.getPrazo(init.created_at, init.data_fechamento);
          }
          
        }

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
