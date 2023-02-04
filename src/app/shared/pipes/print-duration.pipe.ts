import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printDuration'
})
export class PrintDurationPipe implements PipeTransform {

  transform(value:number): string{
      let hours = Math.floor(value/60);
      let minutes = value%60;
      let formatMinute = minutes>=10 ? minutes : '0'+minutes;
      return hours+'h'+formatMinute+'m'; 
  }

}
