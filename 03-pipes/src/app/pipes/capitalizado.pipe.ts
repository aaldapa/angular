import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

    /*  Forma nueva--> de esta forma podemos indicar el tipo de los parametros de uno en uno y
        ponerles como opcionales, obligatorios y/o con valores por defecto

        transform(value: string, arg1: number, arg2: string): string {
    */

    // transform(value: string, ...arg: any[]): string {
        transform(value: string, todas: boolean = true ): string {
        const nombres: string[] = value.toLowerCase().split(' ');
        if (todas) {
            // nombres.forEach( (element , index) => {
            //     nombres [index] = nombres [index][0].toUpperCase() + nombres[index].substring(1);
            // });

            for ( const i in nombres) {
                if (null != nombres[i]) {
                    nombres [i] = nombres [i][0].toUpperCase() + nombres[i].substring(1);
                }
            }
        } else {
            nombres [0] = nombres [0][0].toUpperCase() + nombres [0].substring(1);
        }

        return nombres.join(' ');
    }
}
