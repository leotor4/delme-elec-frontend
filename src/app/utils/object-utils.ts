import momentImported from 'moment'; 
const moment = momentImported;

export class ObjectUtils {

	public static adicionar_campos<T>(itemPrincipal:T,novos_campos:Partial<T>) {
		debugger
		if (novos_campos) {
			Object.assign(itemPrincipal, novos_campos);
		}
	}


	static buscarValor(item: any, atributo: any = null, retornoDefault:any = null) {
		if (!item) {
		  return retornoDefault;
		}
	
		if (!atributo) {
		  return item;
		}
	
		if (typeof atributo === 'number' || atributo.indexOf('.') === -1) {
		  if (item[atributo] == null || item[atributo] === undefined) {
			return retornoDefault;
		  }
		  return item[atributo];
		} else {
		  const fields: string[] = atributo.split('.');
		  let value = item;
		  for (let i = 0, len = fields.length; i < len; ++i) {
			if (value == null) {
			  return retornoDefault;
			}
			value = value[fields[i]];
		  }
		  return value ? value : retornoDefault;
		}
	  }
}
