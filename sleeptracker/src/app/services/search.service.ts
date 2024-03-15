import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  // Mock search function
  search(query: string): Observable<any[]> {
    //need to replace this with a call to  backend API
    const mockResults = [
      { title: `Result for ${query} 1` },
      { title: `Result for ${query} 2` },
      { title: `Result for ${query} 3` }
    ];
    return of(mockResults);
  }
}
