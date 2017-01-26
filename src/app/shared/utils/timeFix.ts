import * as moment from "moment";
import {Pipe, PipeTransform} from '@angular/core';
import { NgModule } from '@angular/core';

// TO fix the time diff. in angyular with timezone and the data input from the server, minus  8 hours to display correct date
export function timeFix(IsoDate){
  let d = new Date(IsoDate);
  return d.setHours(d.getHours() - 8);
}

export function formatMilliToMins(milliesc:number){
  var d = moment.duration(milliesc, 'milliseconds');
  var mins = Math.floor(d.asMinutes());
  var sec = Math.floor(d.asSeconds()) - mins * 60;
  if(mins == 0) return sec+"sec";
  return `${mins}mins ${sec}sec`;
}


@Pipe({
    name: 'formatMilliSec'
})
export class formatMilliToMinsPip implements PipeTransform {
  transform(value: number): string {
    return formatMilliToMins(value);
  }
}


@NgModule({
    imports: [ ],
    declarations: [
      formatMilliToMinsPip
    ],
    exports: [formatMilliToMinsPip]
})

export class TimeFixModule { }
