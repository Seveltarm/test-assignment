import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[0-9]|\s|&/g, "_").toLowerCase();
  }

}
