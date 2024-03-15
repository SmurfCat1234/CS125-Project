import { Component, OnInit } from '@angular/core';
import { NavController, ToastController,AlertController,ModalController  } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { customTransition } from '../animations/custom-animation';


@Component({
  selector: 'app-log-sleep-time',
  templateUrl: './log-sleep-time.page.html',
  styleUrls: ['./log-sleep-time.page.scss'],
})
export class LogSleepTimePage implements OnInit{
  
  tempSleepStart: Date = new Date(this.getCurrentDateTime());
  sleepEnd: Date = new Date(this.getCurrentDateTime());
  showWakeTime: boolean = false;
  showSleepTimePicker: boolean = false;
  showWakeTimePicker: boolean = false;

  sleepTimeString: string;
  wakeTimeString: string;

  constructor(
    private navCtrl: NavController, 
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private sleepService: SleepService
  ) {


    this.sleepTimeString = this.getLocalDateTime();
    this.wakeTimeString = this.getLocalDateTime();



  }


  getLocalDateTime(): string {
    const now = new Date();
    return now.getFullYear() + '-' +
           this.pad(now.getMonth() + 1) + '-' + // Months are 0-based
           this.pad(now.getDate()) + 'T' +
           this.pad(now.getHours()) + ':' +
           this.pad(now.getMinutes());
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  // stopped using this function below
  getCurrentDateTime(): string {
    // Ensure consistent date part for both times
    const now = new Date();
    //this line below is time in UTC. we are in GMT-8. so need to calculate the time difference
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() , now.getMinutes()).
    toISOString();
  }
  
  ngOnInit() {
    
    this.showWakeTime = false;
  }

  openDateTimePicker(isSleepTime: boolean) {
    // Pass current time string to modal
    const currentTimeString = isSleepTime ? this.sleepTimeString : this.wakeTimeString;
    this.presentModal(currentTimeString, isSleepTime);
  }
  async presentModal(timeString: string, isSleepTime: boolean) {
    const modal = await this.modalController.create({
      component: 'DateTimePickerModal', 
      componentProps: { selectedTime: timeString }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (isSleepTime) {
        this.sleepTimeString = data.selectedTime;
      } else {
        this.wakeTimeString = data.selectedTime;
      }
    }
  }



  next() {
    // Navigate to the next page
    this.showWakeTime = true;

  }



  closeDateTimePicker() {
    this.modalController.dismiss();
  }

  
  async logSleep() {
    this.tempSleepStart = new Date(this.sleepTimeString);
    this.sleepEnd = new Date(this.wakeTimeString);
    var difference_ms = this.sleepEnd.getTime() - this.tempSleepStart.getTime();

    console.log(this.tempSleepStart);
    console.log(this.sleepEnd);
    console.log(difference_ms);
    console.log()
  
    if (!this.tempSleepStart || !this.sleepEnd) {
          await this.presentToast('Sleep or wake time is not correct, make sure it is a valid time.');
        } else if (this.tempSleepStart >= this.sleepEnd) {
      await this.presentToast('Wake up time should be later than the time went to bed.');
    } else if (difference_ms > 3600*24*1000*2) { // 48 hours in milliseconds
          await this.presentToast('Sleep duration is longer than 48 hours');
        } 
        else
    {
      const newSleepEntry = new OvernightSleepData(this.tempSleepStart, this.sleepEnd);
      this.sleepService.logOvernightData(newSleepEntry);
      await this.presentToast('Successfully saved sleep time!');
      this.navCtrl.navigateBack('/tabs/home', {
        animation: customTransition
      });
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

