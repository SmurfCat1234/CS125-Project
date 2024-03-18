// src/app/services/recommendation.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SleepService } from './sleep.service'; // Import SleepService
import { UserService } from './user.service'; // Import UserService

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  constructor(private sleepService: SleepService, private userService: UserService) { }

  async getRecommendations(): Promise<any[]> {
    const userProfile = await this.userService.getUserProfile();
    const sleepData = this.sleepService.getOvernightSleepData();
    // Use userProfile and sleepData to tailor recommendations

    // Example recommendations based on user profile and sleep data
    const recommendations = [
      { title: 'Improve Your Sleep Hygiene', content: 'Maintaining a regular sleep schedule can significantly improve your sleep quality.' },
      { title: 'Mindful Meditation', content: 'Consider practicing mindful meditation to relax your mind before bed.' },
      { title: 'Reduce Blue Light Exposure', content: 'Limiting screen time before bed can help you fall asleep faster and improve sleep quality.' }
    ];

    // Personalize recommendations based on userProfile and sleepData
    // This is a simplified example. You should implement more complex logic based on user data.
    if (userProfile && sleepData.length > 0) {
      recommendations.push({ title: 'Custom Recommendation', content: 'Based on your profile and sleep data, we recommend XYZ.' });
    }

    return recommendations;
  }
}
 