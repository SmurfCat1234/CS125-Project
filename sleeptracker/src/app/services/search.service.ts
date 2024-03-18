import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  async performSearch(query: string): Promise<any[]> {
    const modifiedQuery = `${query} sleep health`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(modifiedQuery)}`;
    const url = proxyUrl + targetUrl;
  
    try {
      const response = await fetch(url);
      const html = await response.text();
      return this.parseSearchResults(html);
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }
  

  private parseSearchResults(html: string): any[] {
    const results: any[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Hypothetical example: Assume search results are in <div> elements with a class of 'result'
    const searchResults = doc.querySelectorAll('.result');

    searchResults.forEach((result) => {
      const titleElement = result.querySelector('.result-title');
      const title = titleElement ? titleElement.textContent : 'No title';

      results.push({ title });
    });

    return results;
  }
}
