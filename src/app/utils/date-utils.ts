import momentImported from 'moment'; 
const moment = momentImported;

export class DateUtils {

  public static formato_brasileiro(data:Date): string {
		return moment(data).format('DD/MM/yyyy');
	}

}
