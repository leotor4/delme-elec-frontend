import { ObjectUtils } from './../../../utils/object-utils';
import { NonCompliance } from 'src/app/models/non-compliance';

export class NcsListDTO {
  numero: string = "";
  parceiro: string = "";
  emissor: string = "";
  estado: string;
  system_status:string
  nc: NonCompliance = new NonCompliance() ;

  constructor(init?: Partial<NonCompliance>) {
    if (init) {
        Object.assign(this.nc, init)
        this.numero = ObjectUtils.buscarValor(init, 'code', '')
        this.emissor = ObjectUtils.buscarValor(init, 'emissor.username', '')
        this.estado = ObjectUtils.buscarValor(init, 'status', '')
        this.system_status = ObjectUtils.buscarValor(init, 'system_status', '')
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
}
