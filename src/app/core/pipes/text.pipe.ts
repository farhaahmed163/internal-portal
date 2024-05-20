import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text',
  standalone: true,
})
export class TextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + ' ...' : value;
  }
}
