import { Directive, ElementRef, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { GuiDefaultValue, GuiOperator } from './interface';

/**
 * Lightweight EJS template engine
 *
 * @param str  template string
 * @param data data passed to the template
 * @returns
 *
 * ### Example
 *
 * ```ts
 * const people = ['geddy', 'neil', 'alex'];
 * const res = ejsTmpl('<%= people.join(", ") %>', {people: people});
 * console.log(res);
 * // => 'geddy, neil, alex'
 * ```
 *
 */
export function ejsTmpl(str: string, data: any) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(
    'obj',
    'var p=[],print=function(){p.push.apply(p,arguments);};' +
      // Introduce the data as local variables using with(){}
      'with(obj){p.push("' +
      // Convert the template into pure JavaScript
      str
        .replace(/[\r\t\n]/g, ' ')
        .split('<%')
        .join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '",$1,"')
        .split('\t')
        .join('");')
        .split('%>')
        .join('p.push("')
        .split('\r')
        .join('"') +
      '");}return p.join("");'
  );

  // Provide some basic currying to the user
  return data ? fn(data) : fn;
}

@Pipe({
  name: 'ejs',
})
export class GuiEjsPipe implements PipeTransform {
  transform(value: string, data = {}): string {
    return ejsTmpl(value, data);
  }
}

@Directive({
  selector: '[flex]',
})
export class GuiFlexDirective implements OnInit {
  @Input() flex: number | undefined = 100;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.flex = `1 1 ${this.flex}%`;
    this.el.nativeElement.style.maxWidth = `${this.flex}%`;
  }
}

export function compareValues(
  value1: GuiDefaultValue,
  value2: GuiDefaultValue,
  operator: GuiOperator
) {
  switch (operator) {
    case '$eq':
      return value1 === value2;
    case '$ne':
      return value1 !== value2;
    case '$gt':
      return value1 > value2;
    case '$lt':
      return value1 < value2;
    case '$gte':
      return value1 >= value2;
    case '$lte':
      return value1 <= value2;
    case '$in':
      return Array.isArray(value2) && value2.includes(value1);
    case '$nin':
      return Array.isArray(value2) && !value2.includes(value1);
    default:
      return false;
  }
}

export function getValueByPath(config: Record<string, any>, path: string) {
  return path.split('.').reduce((acc: any, key: string) => {
    return acc?.children?.[key] ? acc.children[key] : acc?.[key];
  }, config);
}
