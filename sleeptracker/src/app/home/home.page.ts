import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';  
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AppModule } from '../app.module';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { customTransition } from '../animations/custom-animation';

import { AnimationController } from '@ionic/angular';

import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage{

	currentTime: string = new Date().toLocaleTimeString();
	sleepStart: Date = new Date(); 
	sleepEnd: Date = new Date();   
	sleepinessLevel: number = 1;   


  constructor(
	private navCtrl: NavController,
	public sleepService:SleepService,
	public alertController: AlertController,
	private animationCtrl: AnimationController ,
	private platform: Platform  // Inject Platform service
	) {

	}

	


	updateTime() {
		this.currentTime = new Date().toLocaleTimeString();
	  }

	// Define the custom animation function
	
	ngOnInit() {


		this.sleepService.init().then(() => {
			// Service is initialized and ready for use


			this.updateTime();
			setInterval(() => this.updateTime(), 1000);	

			this.checkPlatformAndSendNotification();
		  });
		

	}
	async checkPlatformAndSendNotification() {
		if (this.platform.is('ios') || this.platform.is('android')) {
		  await this.sendNotification();
		}
	  }

	  async sendNotification() {
		await LocalNotifications.requestPermissions();
		
		LocalNotifications.schedule({
		  notifications: [
			{
			  title: "Sleep Tracker",
			  body: "It's time to log your sleep today!",
			  id: 1,
			  schedule: { at: new Date(new Date().getTime() + 1000) }, // 1 second from now
			  actionTypeId: "",
			  extra: null
			}
		  ]
		});
	  }
	

	logSleepTime() {
		// Navigate to the page and handle logging sleep time


		this.navCtrl.navigateForward('/tabs/log-sleep-time', {
			animation: customTransition
		});
	}

	logSleepiness() {
		// Navigate to the page and handle logging sleepiness
		this.navCtrl.navigateForward('/tabs/log-sleepiness', {
			animation: customTransition
		});
	}
	
	  showLoggedOvernightSleep() {
		// Navigate to the page and show logged overnight sleep
		this.navCtrl.navigateForward('/tabs/show-logged-overnight-sleep', {
			animation: customTransition
		});
	  }
	
	  showLoggedSleepinessLevels() {
		// Navigate to the page and show logged sleepiness levels
		this.navCtrl.navigateForward('tabs/show-logged-sleepiness-levels', {
			animation: customTransition
		});
	  }




}
