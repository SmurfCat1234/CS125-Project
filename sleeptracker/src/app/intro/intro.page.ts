import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserService, UserProfile } from '../services/user.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('2s', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('2s', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class IntroPage {
  userProfile: UserProfile = {
    name: '',
    email: '',
    username: '',
    birthdate: new Date(),
    bio: '',
    gender: '',
    preferredSleepTime: '',
    preferredWakeUpTime: '',
    stressors: [],
    dailyActivities: [],
    dietaryHabits: [],

  };
  showWelcome = true;
  showBirthdayPicker = false;
  showSleepTimePicker = false;
  showWakeTimePicker = false;
  selectedStressors: string[] = [];
  selectedActivities: string[] = [];
  selectedDietaryHabits: string[] = [];


  getStarted() {
    this.showWelcome = false;
  }


  birthdateISO: string = new Date().toISOString();

  constructor(private userService: UserService, private navCtrl: NavController) {}

  togglePicker(pickerType: string, show: boolean = true) {
    if (pickerType === 'birthday') {
      this.showBirthdayPicker = show;
    } else if (pickerType === 'preferredSleepTime') {
      this.showSleepTimePicker = show;
    } else if (pickerType === 'preferredWakeUpTime') {
      this.showWakeTimePicker = show;
    }
  }

  async submitForm() {
    // Convert ISO string to Date object for userProfile
    this.userProfile.birthdate = new Date(this.birthdateISO);
    this.userProfile.stressors = this.selectedStressors;
    this.userProfile.dailyActivities = this.selectedActivities;
    this.userProfile.dietaryHabits = this.selectedDietaryHabits;
    await this.userService.setUserProfile(this.userProfile);
    this.navCtrl.navigateRoot('/tabs/home');
  }
}
