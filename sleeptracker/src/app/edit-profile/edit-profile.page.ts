import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  showBirthdayPicker = false;
  showSleepTimePicker = false;
  showWakeTimePicker = false;


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
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const profile = await this.userService.getUserProfile();
    if (profile) {
      this.userProfile ={ ...profile };
      // Convert the birthdate to ISO string format
      this.birthdateISO = profile.birthdate.toISOString();
    } else {
      this.showMessage('No existing profile found. Redirecting to intro...');
      this.navCtrl.navigateRoot('/intro');
    }
  }


  async saveProfile() {

    try {
      await this.userService.setUserProfile(this.userProfile);
      this.showMessage('Profile saved successfully.');
      this.navCtrl.navigateBack('/tabs/profile');
    } catch (error) {
      this.showMessage('Error saving profile. Please try again.');
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }


  togglePicker(pickerType: string, show: boolean = true) {
    if (pickerType === 'birthday') {
      this.showBirthdayPicker = show;
    } else if (pickerType === 'preferredSleepTime') {
      this.showSleepTimePicker = show;
    } else if (pickerType === 'preferredWakeUpTime') {
      this.showWakeTimePicker = show;
    }
  }
}
