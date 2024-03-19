import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../services/user.service';
import { SleepService } from '../services/sleep.service';

import { NavController, ToastController } from '@ionic/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, NavigationEnd } from '@angular/router';

import { EventService } from '../services/event.service';
@Component({
  // standalone:true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],


})

export class ProfilePage implements OnInit {
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
  birthdateISO: string = new Date().toISOString();


  constructor(
    private userService: UserService,
    private sleepService: SleepService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private eventService: EventService
  ) {}

  // async ngOnInit() {
  //   const profile = await this.userService.getUserProfile();
  //   if (profile) {

  //     profile.stressors = profile.stressors || [];
  //     profile.dailyActivities = profile.dailyActivities || [];
  //     profile.dietaryHabits = profile.dietaryHabits || [];

  //     this.userProfile = profile;
  //   } else {

  //     this.navCtrl.navigateRoot('/intro');
  //   }
  // }

  async ngOnInit() {
    await this.loadUserProfile();


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (event.urlAfterRedirects.includes('/profile')) {
          this.loadUserProfile();
        }
      }
    });
  }

  async loadUserProfile() {
    const profile = await this.userService.getUserProfile();
    if (profile) {
      this.userProfile = profile;
    } else {
      this.navCtrl.navigateRoot('/intro');
    }
  }

  async editProfile() {

    this.navCtrl.navigateForward('/edit-profile');
  }


  async deleteProfile() {
    await this.userService.clearUserProfile();
    await this.sleepService.clearAllSleepData(); // Clear sleep data along with user profile
    this.navCtrl.navigateRoot('/intro');
  }

  async importSleepData() {

    await this.sleepService.clearAllSleepData();

    await this.sleepService.addPersonalData();
    this.eventService.dataImported.emit();
    const toast = await this.toastCtrl.create({
      message: 'imported default sleep successfully.',
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    await toast.present();
  }


  async clearSleepData() {
    await this.sleepService.clearAllSleepData();
    const toast = await this.toastCtrl.create({
      message: 'Sleep data has been cleared.',
      duration: 2000,
      position: 'bottom',
      color: 'primary',
    });
    await toast.present();
  }

  calculateAge(birthdate: Date | undefined): number | undefined {
    if (!birthdate) return undefined;
    const ageDifMs = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculatePreferredSleepHours(): number {
    if (!this.userProfile?.preferredSleepTime || !this.userProfile?.preferredWakeUpTime) {
      return 0;
    }


    const sleepTimeParts = this.userProfile.preferredSleepTime.split(':');
    const wakeUpTimeParts = this.userProfile.preferredWakeUpTime.split(':');
    const sleepTime = new Date();
    sleepTime.setHours(parseInt(sleepTimeParts[0]), parseInt(sleepTimeParts[1]));
    const wakeUpTime = new Date();
    wakeUpTime.setHours(parseInt(wakeUpTimeParts[0]), parseInt(wakeUpTimeParts[1]));


    let difference = wakeUpTime.getTime() - sleepTime.getTime();


    if (difference < 0) {
      difference += 24 * 60 * 60 * 1000;
    }


    return difference / (1000 * 60 * 60);
  }

  // logout() {

  //   this.userService.clearUserData(); // Ensure this method exists in your UserService to clear user data
  //   this.navCtrl.navigateRoot('/login');
  // }
}
