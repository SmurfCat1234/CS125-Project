import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

import { PythonBridge, NDArray, ArrayLike, SparseMatrix } from 'sklearn/build/index'; // Adjusted path

import * as sklearn from 'sklearn';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

	private pyBridge: any;
	private model: any;

	private static LoadDefaultData:boolean = false;
	//public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor(private storage: Storage) {

		this.init();
	}


	async init() {

		// this.pyBridge = await sklearn.createPythonBridge();
		// this.model = new sklearn.LinearRegression();
		// await this.model.init(this.pyBridge);


		//await this.clearAllData();
		await this.storage.create();
		const dataLoaded = await this.loadAllData();

		if (!dataLoaded && SleepService.LoadDefaultData) {
		  this.addDefaultData();
		  SleepService.LoadDefaultData = false;
		}
	  }




	private async loadAllData(): Promise<boolean> {
		const overnightData = await this.storage.get('allOvernightData');
		const sleepinessData = await this.storage.get('allSleepinessData');

		if (overnightData) {
		  SleepService.AllOvernightData = overnightData.map(this.toOvernightSleepData);
		}
		if (sleepinessData) {
		  SleepService.AllSleepinessData = sleepinessData.map(this.toStanfordSleepinessData);
		}

		return !!(overnightData || sleepinessData);
	  }
	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	async addPersonalData() {
		const sleepDates = [
		  // Existing data
		  { start: 'February 18, 2024 01:03:00', end: 'February 18, 2024 09:25:00' },
		  { start: 'February 20, 2024 23:11:00', end: 'February 21, 2024 08:03:00' },
		  { start: 'February 22, 2024 22:00:00', end: 'February 23, 2024 06:30:00' },
		  { start: 'February 24, 2024 22:15:00', end: 'February 25, 2024 07:00:00' },
		  { start: 'February 26, 2024 22:15:00', end: 'February 27, 2024 06:45:00' },
		  { start: 'February 28, 2024 22:00:00', end: 'February 29, 2024 07:15:00' },
		  { start: 'March 02, 2024 22:30:00', end: 'March 03, 2024 06:50:00' },
		  { start: 'March 04, 2024 21:45:00', end: 'March 05, 2024 07:00:00' },
		  { start: 'March 06, 2024 22:30:00', end: 'March 07, 2024 06:30:00' },
		  { start: 'March 08, 2024 23:00:00', end: 'March 09, 2024 07:00:00' },
		  { start: 'March 10, 2024 22:00:00', end: 'March 11, 2024 06:20:00' },

		];

		sleepDates.forEach(({ start, end }) => {
		  this.logOvernightData(new OvernightSleepData(new Date(start), new Date(end)));
		});

		const sleepinessDates = [
			{ value: 4, date: 'February 19, 2024 14:38:00' },
			{ value: 5, date: 'February 20, 2024 21:38:00' },
			{ value: 3, date: 'February 22, 2024 15:00:00' },
			{ value: 6, date: 'February 24, 2024 20:00:00' },
			{ value: 2, date: 'February 26, 2024 14:30:00' },
			{ value: 4, date: 'February 28, 2024 16:45:00' },
			{ value: 5, date: 'March 02, 2024 15:20:00' },
			{ value: 3, date: 'March 04, 2024 14:00:00' },
			{ value: 2, date: 'March 06, 2024 18:30:00' },
			{ value: 5, date: 'March 08, 2024 17:15:00' },
			{ value: 6, date: 'March 10, 2024 19:00:00' },


		];

		sleepinessDates.forEach(({ value, date }) => {
		  this.logSleepinessData(new StanfordSleepinessData(value, new Date(date)));
		});
	  }


	  async trainAndPredictModel(): Promise<number> {

		//  sleep data preprocessing
		const sleepData = await this.getFormattedSleepData();
		const X = sleepData.map(d => [d.hours, d.qualityValue]);
		const y = sleepData.map(d => d.hours);


		// Train the model
		await this.model.fit({ X, y });

		//  prediction (modify according to application's logic)

		const predictedHours = await this.model.predict({ X: [[7.5, 1]] });
		// Assuming 7.5 hours and OK quality (encoded as 1)
		console.log(`Recommended Sleep Time: ${predictedHours[0].toFixed(2)} hours`);
		return predictedHours[0];
	  }

	  private async getFormattedSleepData(): Promise<{ hours: number, qualityValue: number }[]> {
		const overnightData = await this.storage?.get('allOvernightData');
		return overnightData.map((data: { hoursSlept: any; sleepQuality: string; }) => ({
		  hours: data.hoursSlept,
		  qualityValue: this.mapQualityToValue(data.sleepQuality)
		}));
	  }
	  async disposeResources() {
		await this.model.dispose();
		await this.pyBridge.disconnect();
	  }


	  private mapQualityToValue(quality: string): number {
		const qualityMapping: { [key: string]: number } = { 'BAD': 0, 'OK': 1, 'GOOD': 2 };
		return qualityMapping[quality.toUpperCase()] || 0;
	  }

	  async predictSleepTime(qualityValue: number): Promise<number> {
		// Example prediction for 7.5 hours with a given quality
		const prediction = await this.model.predict([[7.5, qualityValue]]);
		return prediction[0];
	  }

    async predictSleepTime1(quality: number): Promise<number> {
      // Using a simple multiplier for sleep quality to predict sleep time
      //
      const baseSleepTime = 7; // Base sleep time in hours
      const qualityMultiplier = 0.5; // Multiplier for sleep quality effect
      return baseSleepTime + quality * qualityMultiplier;
    }

	  ////////////////////
	  //////////////////////
	  //////////////////////


	public async logOvernightData(sleepData: OvernightSleepData) {
		SleepService.AllOvernightData.push(sleepData);
		await this.storage.set('allOvernightData', SleepService.AllOvernightData);
	  }



	  public async logSleepinessData(sleepData: StanfordSleepinessData) {
		SleepService.AllSleepinessData.push(sleepData);
		await this.storage.set('allSleepinessData', SleepService.AllSleepinessData);
	  }


	//


	public getOvernightSleepData(): OvernightSleepData[] {
		return SleepService.AllOvernightData;
	  }

	public getSleepinessData(): StanfordSleepinessData[] {
		return SleepService.AllSleepinessData;
	  }



	////////


	private toOvernightSleepData(obj: any): OvernightSleepData {
		return new OvernightSleepData(new Date(obj.sleepStart), new Date(obj.sleepEnd));
	  }

	private toStanfordSleepinessData(obj: any): StanfordSleepinessData {
		return new StanfordSleepinessData(obj.loggedValue, new Date(obj.loggedAt));
	  }


	  //////


	public async editOvernightData(index: number, newData: OvernightSleepData) {
		if (index >= 0 && index < SleepService.AllOvernightData.length) {
		  SleepService.AllOvernightData[index] = newData;
		  await this.storage.set('allOvernightData', SleepService.AllOvernightData);
		}
	}

	public async deleteOvernightData(index: number) {
		if (index >= 0 && index < SleepService.AllOvernightData.length) {
		  SleepService.AllOvernightData.splice(index, 1);
		  await this.storage.set('allOvernightData', SleepService.AllOvernightData);
		}
	}



	public async editSleepinessData(index: number, newData: StanfordSleepinessData) {
		if (index >= 0 && index < SleepService.AllSleepinessData.length) {
		  SleepService.AllSleepinessData[index] = newData;
		  await this.storage.set('allSleepinessData', SleepService.AllSleepinessData);
		}
	  }

	  public async deleteSleepinessData(index: number) {
		if (index >= 0 && index < SleepService.AllSleepinessData.length) {
		  SleepService.AllSleepinessData.splice(index, 1);
		  await this.storage.set('allSleepinessData', SleepService.AllSleepinessData);
		}
	  }

	  public async clearAllData() {
		// Clear the data in static arrays
		SleepService.AllOvernightData = [];
		SleepService.AllSleepinessData = [];

		// Clear the data in storage

		await this.storage.remove('allOvernightData');
		await this.storage.remove('allSleepinessData');
		await this.storage.clear();
	  }

	  async clearAllSleepData() {
		SleepService.AllOvernightData = [];
		SleepService.AllSleepinessData = [];
		await this.storage.remove('allOvernightData');
		await this.storage.remove('allSleepinessData');
	  }

}
