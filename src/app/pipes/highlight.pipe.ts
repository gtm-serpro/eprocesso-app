import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: false
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined, search: string): SafeHtml {
    if (!value) return '';
    if (!search || search.trim() === '') return value;

    const searchTerm = search.trim();
    const regex = new RegExp(`(${this.escapeRegExp(searchTerm)})`, 'gi');
    const highlighted = value.replace(regex, '<mark class="highlight">$1</mark>');

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
