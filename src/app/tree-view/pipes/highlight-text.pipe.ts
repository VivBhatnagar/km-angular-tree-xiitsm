import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlightText' })
export class HighlightTextPipe implements PipeTransform {
    constructor(public sanitizer: DomSanitizer) {
    }
    transform(text: string, search): SafeHtml {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'i');
            if(regex.test(text)) {
              return this.sanitizer.bypassSecurityTrustHtml(
                  text.replace(regex, (match) => `<mark class="search-highlight">${match}</mark>`)
              );
            } else {
              return text;
            }
        } else {
            return text;
        }
    }
}