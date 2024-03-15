import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor() { }

  // Mock function to get recommendations
  getRecommendations(): Observable<any[]> {
    // Replace this with actual logic to fetch recommendations, possibly from a backend
    const mockRecommendations = [
      { title: 'Improve Your Sleep Hygiene', content: 'Maintaining a regular sleep schedule can significantly improve your sleep quality.' },
      { title: 'Mindful Meditation', content: 'Consider practicing mindful meditation to relax your mind before bed.' },
      { title: 'Reduce Blue Light Exposure', content: 'Limiting screen time before bed can help you fall asleep faster and improve sleep quality.' }
    ];
    return of(mockRecommendations);
  }
}
