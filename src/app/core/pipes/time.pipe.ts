import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  }
}
