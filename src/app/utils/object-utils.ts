import momentImported from 'moment'; 
const moment = momentImported;

export class ObjectUtils {

	public static adicionar_campos<T>(itemPrincipal:T,novos_campos:Partial<T>) {
		if (novos_campos) {
			Object.assign(itemPrincipal, novos_campos);
		}
	}
}
