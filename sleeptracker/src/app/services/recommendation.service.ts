
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SleepService } from './sleep.service';
import { UserService } from './user.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { UserProfile } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  public recommendations: { [key: string]: string } = {
    improveSleepHygiene: 'Maintaining a regular sleep schedule can significantly improve your sleep quality.',
    mindfulMeditation: 'Consider practicing mindful meditation to relax your mind before bed.',
    reduceBlueLight: 'Limiting screen time before bed can help you fall asleep faster and improve sleep quality.',
    sleepEnvironment: 'Ensure your sleeping environment is conducive to rest. Consider factors like light, noise, and temperature.',
    physicalExercise: 'Regular physical exercise can help you fall asleep faster and enjoy deeper sleep.',
    avoidCaffeine: 'Limit caffeine intake, especially in the hours leading up to bedtime, to improve sleep quality.',
    relaxationTechniques: 'Incorporate relaxation techniques such as deep breathing or progressive muscle relaxation before bed.',
    comfortableBedding: 'Invest in comfortable bedding to improve sleep comfort and quality.',
    eveningRoutine: 'Establish a calming evening routine to signal your body it’s time to wind down.',
    avoidHeavyMeals: 'Avoid heavy or large meals within a couple of hours of bedtime.',
    sleepConsistency: 'Try to go to bed and wake up at the same time every day, even on weekends.',
    napWisely: 'Limit naps to 20 minutes and avoid napping late in the day.',
    naturalLightExposure: 'Expose yourself to natural sunlight during the day to regulate your sleep-wake cycle.',
    bedroomOnlyForSleep: 'Use your bedroom only for sleep to strengthen the association between bed and sleep.',
    writeDownWorries: 'Write down your worries before bedtime to clear your mind.',
    bathOrShower: 'Taking a warm bath or shower before bed can help you relax and improve sleep quality.',
    avoidAlcohol: 'Avoid alcohol before bedtime, as it can interfere with your sleep cycle.',
    sleepFriendlySnacks: 'Choose sleep-friendly snacks if you need a pre-bedtime nibble.',
    digitalDetox: 'Consider a digital detox before bed to reduce stimulation.',
    sleepDiary: 'Keep a sleep diary to identify patterns or issues with your sleep.',
    mindfulnessOrYoga: 'Practice mindfulness or gentle yoga to calm the mind before sleep.',
  };


  constructor(private sleepService: SleepService, private userService: UserService) { }

  async getRecommendations(): Promise<any[]> {

    const userSleepData = await this.sleepService.getOvernightSleepData();

    const userProfile = await this.userService.getUserProfile();

    const userRecommendations: { title: string, content: string }[] = [];

    let recommendationsWithScores: { title: string; content: string; score: number }[] = [];


    const recommendedSleepTime = await this.sleepService.predictSleepTime1(1);

    const sleepData = this.sleepService.getOvernightSleepData();

    // const recommendations = [
    //   { title: 'Recommended Sleep Time', content: `Based on your data, we recommend ${recommendedSleepTime.toFixed(2)} hours of sleep.` },
    //   { title: 'Improve Your Sleep Hygiene', content: 'Maintaining a regular sleep schedule can significantly improve your sleep quality.' },
    //   { title: 'Mindful Meditation', content: 'Consider practicing mindful meditation to relax your mind before bed.' },
    //   { title: 'Reduce Blue Light Exposure', content: 'Limiting screen time before bed can help you fall asleep faster and improve sleep quality.' }

    // ];

    if (userProfile && userSleepData.length > 0) {
      const avgSleepHours = this.calculateAverageSleepHours(userSleepData);
      const sleepQuality = this.calculateSleepQuality(userSleepData);

      const sleepDurationScore = avgSleepHours < 7 ? 10 : (avgSleepHours >= 7 && avgSleepHours < 8 ? 5 : 0);

      if (sleepDurationScore > 0) {
        recommendationsWithScores.push({ title: 'Sleep Duration', content: this.recommendations["improveSleepHygiene"], score: sleepDurationScore });
      }

      const sleepQualityScore = sleepQuality === 'Poor' ? 10 : 5;
      recommendationsWithScores.push({ title: 'Sleep Quality', content: this.recommendations["mindfulMeditation"], score: sleepQualityScore });


      if (userProfile.stressors?.includes('work')) {
        const workStressScore = 8;
        recommendationsWithScores.push({ title: 'Work Stress', content: 'Work-related stress can impact sleep. Consider disconnecting from work-related activities at least an hour before bed.', score: workStressScore });

      }

      if (userProfile.stressors?.includes('health')) {
        const healthStressScore = 8;
        recommendationsWithScores.push({ title: 'Practice Relaxation Techniques', content: this.recommendations["relaxationTechniques"], score: healthStressScore });
      }
      if (userProfile.bio.includes('insomnia')) {
        const insomniaScore = 10; // High impact
        recommendationsWithScores.push({ title: 'Improve Sleep Environment', content: this.recommendations['sleepEnvironment'], score: insomniaScore });
      }
      if (userProfile.dailyActivities?.includes('sedentary')) {
        recommendationsWithScores.push({ title: 'Physical Activity', content: 'A sedentary lifestyle can affect sleep. Try to incorporate more physical activity into your daily routine.', score: 7 });
      }

      if (userProfile.stressors?.includes('finances')) {
        recommendationsWithScores.push({ title: 'Financial Stress', content: 'Consider financial planning or consulting a financial advisor to alleviate stress related to finances.',score: 6 });
      }
      recommendationsWithScores.push({ title: 'Meal Timing', content: this.recommendations["avoidHeavyMeals"],score: 3 });





      if (userProfile.dietaryHabits?.includes('caffeine')) {
        userRecommendations.push({ title: 'Caffeine Intake', content: 'High caffeine intake can affect sleep. Try to limit caffeine consumption, especially in the afternoon and evening.' });
      }recommendationsWithScores.push({ title: 'Mind Clearance', content: this.recommendations["writeDownWorries"],score:4 });

      if (userProfile.dietaryHabits?.includes('heavyDinner')) {
        const heavyDinnerScore = 7;
        recommendationsWithScores.push({ title: 'Lighten Your Dinner', content: this.recommendations['avoidHeavyMeals'], score: heavyDinnerScore });
      }

      recommendationsWithScores.push({ title: 'Pre-sleep Relaxation', content: this.recommendations["bathOrShower"],score:2 });
      if (userProfile.dailyActivities?.includes('nightShift')) {
        const nightShiftScore = 8; // Working night shifts can severely affect sleep
        recommendationsWithScores.push({ title: 'Manage Light Exposure', content: this.recommendations['naturalLightExposure'], score: nightShiftScore });
      }
      recommendationsWithScores.push({ title: 'Alcohol Consumption', content: this.recommendations["avoidAlcohol"],score:6 });
      if (userProfile.stressors?.some(stressor => ['family', 'relationships'].includes(stressor))) {
        const relationshipStressScore = 7;
        recommendationsWithScores.push({ title: 'Manage Relationship Stress', content: this.recommendations['writeDownWorries'], score: relationshipStressScore });
      }
      if (userProfile.dailyActivities?.includes('heavyExercise') && avgSleepHours < 7) {
        recommendationsWithScores.push({ title: 'Exercise Timing', content: 'Exercising too close to bedtime can be stimulating. Try to finish workouts at least 3 hours before sleep.',score:5 });
      }
      const generalWellbeingScore = 3; // Lower score since it's not highly personalized
      recommendationsWithScores.push({ title: 'General Wellbeing', content: this.recommendations['mindfulnessOrYoga'], score: generalWellbeingScore });

      recommendationsWithScores.push({ title: 'Evening Routine', content: this.recommendations["eveningRoutine"], score : 1});


      recommendationsWithScores.push({ title: 'Nap Strategy', content: this.recommendations["napWisely"] ,score: 2});


      if (userProfile.dietaryHabits?.includes('highProtein')) {
        recommendationsWithScores.push({ title: 'Dietary Balance', content: 'While protein is important, ensure your diet is balanced. A heavy meal too close to bedtime, especially high in protein, can disrupt sleep.',score:4 });
      } recommendationsWithScores.push({ title: 'Sleep Consistency', content: this.recommendations["sleepConsistency"],score:4 });

      recommendationsWithScores.push({ title: 'Sunlight Exposure', content: this.recommendations["naturalLightExposure"] ,score:1});

      if (userProfile.stressors?.includes('personalSafety')) {
        recommendationsWithScores.push({ title: 'Safety Concerns', content: 'Addressing personal safety concerns, such as improving home security, can alleviate anxiety and improve sleep.',score:9 });
      }
      // Ensure the bedroom is optimized for sleep

      recommendationsWithScores.push({ title: 'Optimize Bedroom for Sleep', content: this.recommendations["bedroomOnlyForSleep"],score:2 });

      // Address worries directly
      if (userProfile.stressors?.length > 0) {
        recommendationsWithScores.push({ title: 'Addressing Worries', content: this.recommendations["writeDownWorries"],score: 3 });
      }

      recommendationsWithScores.push({ title: 'Sleep Environment', content: this.recommendations['sleepEnvironment'],score:4 });
      recommendationsWithScores.push({ title: 'Reduce Blue Light Exposure', content: this.recommendations['reduceBlueLight'],score:5 });
    }

    recommendationsWithScores.sort((a, b) => b.score - a.score);

    //no more than 3 entries are returned
    const topRecommendations = recommendationsWithScores.slice(0, 3);

    // Map to remove score and return the final sorted recommendations
    return topRecommendations.map(({ title, content }) => ({ title, content }));


  }

  private calculateAverageSleepHours(sleepData: OvernightSleepData[]): number {
    const totalSleepHours = sleepData.reduce((acc, curr) => acc + curr.getSleepDuration(), 0);
    return totalSleepHours / sleepData.length;
  }

  private calculateSleepQuality(sleepData: OvernightSleepData[]): string {
    //  classify sleep quality based on sleep duration
    const avgSleepHours = this.calculateAverageSleepHours(sleepData);
    return avgSleepHours >= 7 ? 'Good' : 'Poor';
  }





    // if (userProfile && sleepData.length > 0) {
    //   recommendations.push({ title: 'Custom Recommendation', content: 'Based on your profile and sleep data, we recommend that you get more than 8 hours of sleep.' });
    // }

  //   return recommendations;
  // }


}
