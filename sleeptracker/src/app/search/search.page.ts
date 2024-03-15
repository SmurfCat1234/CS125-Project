import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})

export class SearchPage {
  searchQuery = '';
  // Explicitly declare the type of searchResults as any[]
  searchResults: any[] = [];

  constructor(private searchService: SearchService) {}

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.searchService.search(this.searchQuery).subscribe(results => {
      this.searchResults = results;
    });
  }
}
