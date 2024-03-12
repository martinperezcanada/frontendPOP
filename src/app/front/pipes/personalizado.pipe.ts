import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalizado'
})
export class PersonalizadoPipe implements PipeTransform {

  transform(isConfirmed: boolean): string {
    return isConfirmed ? '¡Producto eliminado con éxito!' : 'Operación de eliminación cancelada.';
  }

}
