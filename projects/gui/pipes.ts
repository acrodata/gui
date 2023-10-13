import { Pipe, PipeTransform } from '@angular/core';

// EJS 模板引擎的简易实现方案
@Pipe({ name: 'ejs' })
export class GuiEjsPipe implements PipeTransform {
  private tmpl(str: string, data: any) {
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

  transform(value: string, data = {}): string {
    return this.tmpl(value, data);
  }
}
