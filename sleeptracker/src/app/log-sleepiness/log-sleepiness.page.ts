import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { NavController, ToastController,AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})
export class LogSleepinessPage {
  sleepinessLevel: number = 0;
  sleepinessLevels = [
    { value: 1, description: '1 - Feeling active, vital, alert, or wide awake' },

    { value: 2, description: '2 - Functioning at high levels, but not at peak; able to concentrate' },
    { value: 3, description: '3 - Awake, but relaxed; responsive but not fully alert' },
    { value: 4, description: '4 - Somewhat foggy, let down' },
    { value: 5, description: '5 - Foggy; losing interest in remaining awake; slowed down' },
    { value: 6, description: '6 - Sleepy, woozy, fighting sleep; prefer to lie down' },
    { value: 7, description: '7 - No longer fighting sleep, sleep onset soon; having dream-like thoughts' },


  ];
  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private sleepService: SleepService) {}

  async logSleepiness() {
    if (this.sleepinessLevel > 0 && this.sleepinessLevel < 8) {
      let sleepinessData = new StanfordSleepinessData(this.sleepinessLevel, new Date());
      this.sleepService.logSleepinessData(sleepinessData);
      console.log(`Logged Sleepiness Level: ${this.sleepinessLevel} at ${new Date().toLocaleTimeString()}`);



    const toast =  await this.toastController.create({
      message: 'Successfully logged sleepiness!',
      duration: 2000
  });
  toast.present();


  // Navigate back to home screen
  this.navCtrl.navigateBack('/tabs/home');
    } else {

      console.error('Sleepiness level is not selected or invalid!');

      const alert = await this.alertController.create({
        header: 'Invalid Sleepiness Level',
        message: 'Sleepiness level is not selected or invalid!',
        buttons: ['OK']
    });

    alert.present();
    return;
    }
  }

}
