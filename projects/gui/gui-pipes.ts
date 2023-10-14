import { Pipe, PipeTransform } from '@angular/core';
import { ejsTmpl } from './gui-utils';

@Pipe({ name: 'ejs' })
export class GuiEjsPipe implements PipeTransform {
  transform(value: string, data = {}): string {
    return ejsTmpl(value, data);
  }
}
