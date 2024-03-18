import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  searchQuery = '';
  searchResults: any[] = [];

  constructor(private searchService: SearchService) {}

  async performSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    // Use await to handle the promise returned by performSearch
    this.searchResults = await this.searchService.performSearch(this.searchQuery);
  }
}
