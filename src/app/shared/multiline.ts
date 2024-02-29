import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multiline' })
export class Multiline implements PipeTransform {
  transform(str: string): any {
    return str.replace(/\n/g, "<br/>");
  }
}