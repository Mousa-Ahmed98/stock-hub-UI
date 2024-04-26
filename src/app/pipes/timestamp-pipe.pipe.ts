import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampPipe',
  standalone: true
})
export class TimestampPipePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return formattedDate;
  }

}
