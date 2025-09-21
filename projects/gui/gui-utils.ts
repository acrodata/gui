import { Directive, ElementRef, Input, OnInit, Pipe, PipeTransform, inject } from '@angular/core';
import { GuiDefaultValue, GuiFields, GuiOperator } from './interface';

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
  standalone: true,
})
export class GuiEjsPipe implements PipeTransform {
  transform(value: string, data = {}): string {
    return ejsTmpl(value, data);
  }
}

@Directive({
  selector: '[flex]',
  standalone: true,
})
export class GuiFlexDirective implements OnInit {
  private el = inject(ElementRef);

  @Input() flex: number | undefined = 100;

  ngOnInit(): void {
    this.el.nativeElement.style.flex = `1 1 ${this.flex}%`;
    this.el.nativeElement.style.maxWidth = `${this.flex}%`;
  }
}

export function compareValues(a: GuiDefaultValue, b: GuiDefaultValue, operator: GuiOperator) {
  switch (operator) {
    case '$eq':
      return a === b;
    case '$ne':
      return a !== b;
    case '$gt':
      return (a ?? 0) > (b ?? 0);
    case '$lt':
      return (a ?? 0) < (b ?? 0);
    case '$gte':
      return (a ?? 0) >= (b ?? 0);
    case '$lte':
      return (a ?? 0) <= (b ?? 0);
    case '$in':
      return Array.isArray(b) && b.includes(a);
    case '$nin':
      return Array.isArray(b) && !b.includes(a);
    default:
      return false;
  }
}

export function getValueByPath(obj: Record<string, any>, path: string) {
  return path.split('.').reduce((acc: Record<string, any> | undefined, key) => {
    return acc?.['children']?.[key] ? acc['children'][key] : acc?.[key];
  }, obj);
}

export function getModelFromConfig(config: GuiFields = {}, model: Record<string, any> = {}) {
  for (const [key, fieldCfg] of Object.entries(config)) {
    if (model[key] != null) {
      continue;
    }
    if (fieldCfg.default != null) {
      model[key] = fieldCfg.default;
    } else {
      if (
        fieldCfg.type === 'group' ||
        fieldCfg.type === 'inline' ||
        fieldCfg.type === 'menu' ||
        fieldCfg.type === 'menuItem'
      ) {
        model[key] = getModelFromConfig(fieldCfg.children as GuiFields, {});
      } else if (fieldCfg.type === 'tabs') {
        model[key] = [];
      } else {
        model[key] = null;
      }
    }
  }
  return model;
}
