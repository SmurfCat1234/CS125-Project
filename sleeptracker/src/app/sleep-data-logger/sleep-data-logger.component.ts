import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';  
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sleep-data-logger',
  templateUrl: './sleep-data-logger.component.html',
  styleUrls: ['./sleep-data-logger.component.scss'],
})
export class SleepDataLogger {
  sleepStart: Date ;
  sleepEnd: Date;

  constructor(public alertController: AlertController) {
    this.sleepStart = new Date(); // Initialize with current date or a specific date
    this.sleepEnd = new Date(); // Initialize similarly
  }

  @Output() sleepLogged: EventEmitter<{start: Date, end: Date}> = new EventEmitter();

  logSleepData() {
    if(this.sleepStart && this.sleepEnd && this.sleepStart < this.sleepEnd) {
      this.sleepLogged.emit({start: this.sleepStart, end: this.sleepEnd});
    } else {
      // Handle invalid input
      this.presentAlert('Invalid sleep time!');
    }
  }

  
	async presentAlert(message: string) {
		const alert = await this.alertController.create({
		  header: 'Error',
		  message: message,
		  buttons: ['OK']
		});
	
		await alert.present();
	  }
}