import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  searchQuery = '';
  searchResults: any[] = [];
  isLoading = false;

  constructor(private searchService: SearchService, private sanitizer: DomSanitizer) {}

  async performSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }
    this.isLoading = true;

    const rawResults = await this.searchService.performSearch(this.searchQuery);
    this.searchResults = rawResults.map(result => ({
      ...result,
      content: this.transformResponseText(result.content)
    }));
    this.isLoading = false;
  }

  transformResponseText(text: string): SafeHtml {
    let transformedText = text.replace(/\n\*/g, '<br>');

    transformedText = text.replace(/\*\*(.*?)\*\*/g, '<h5><strong>$1</strong></h5>')
      .replace(/\n/g, '<br>');


    return this.sanitizer.bypassSecurityTrustHtml(transformedText);
  }




}
