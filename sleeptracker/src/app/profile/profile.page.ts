import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../services/user.service';
import { SleepService } from '../services/sleep.service';

import { NavController, ToastController } from '@ionic/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  // standalone:true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],


})

export class ProfilePage implements OnInit {
  userProfile?: UserProfile;

  // userProfile = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   username: 'johnny',
  //   birthdate: new Date(1990, 1, 1),
  //   bio: 'Passionate about technology and innovation.'
  //   // Add more fields as necessary
  // };
  constructor(
    private userService: UserService,
    private sleepService: SleepService,
    private navCtrl: NavController,
    private toastCtrl: ToastController 

  ) {}

  async ngOnInit() {
    const profile = await this.userService.getUserProfile();
    if (profile) {
      this.userProfile = profile;
    } else {
      // Handle the case where there is no user profile, e.g., redirect to intro page or show a message
      this.navCtrl.navigateRoot('/intro');
    }
  }

  async editProfile() {
    // Navigate to a page where the user can edit their profile
    // After editing, update the profile in UserService
    this.navCtrl.navigateForward('/edit-profile');
  }
  

  async deleteProfile() {
    await this.userService.clearUserProfile();
    await this.sleepService.clearAllSleepData(); // Clear sleep data along with user profile
    this.navCtrl.navigateRoot('/intro'); // Navigate back to intro page
  }
  
  async importSleepData() {
    
    await this.sleepService.clearAllSleepData();

    await this.sleepService.addPersonalData();
    const toast = await this.toastCtrl.create({
      message: 'imported default sleep successfully.',
      duration: 2000, // The toast will be displayed for 2 seconds
      position: 'bottom', // Position of the toast
      color: 'primary', 
    });
    await toast.present(); // Present the toast
  }


  async clearSleepData() {
    await this.sleepService.clearAllSleepData();
    const toast = await this.toastCtrl.create({
      message: 'Sleep data has been cleared.',
      duration: 2000, // The toast will be displayed for 2 seconds
      position: 'bottom', // Position of the toast
      color: 'primary', 
    });
    await toast.present(); // Present the toast
  }

  

  // logout() {
   
  //   this.userService.clearUserData(); // Ensure this method exists in your UserService to clear user data
  //   this.navCtrl.navigateRoot('/login');
  // }
}
