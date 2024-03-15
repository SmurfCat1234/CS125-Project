import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	//public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

		constructor(private storage: Storage) {

		this.init();
	}
	

	async init() {
		//await this.clearAllData();
		await this.storage.create();
		const dataLoaded = await this.loadAllData();
	  
		if (!dataLoaded && SleepService.LoadDefaultData) {
		  this.addDefaultData();
		  SleepService.LoadDefaultData = false;
		}
	  }  


	//   private async loadAllData() {
	// 	const overnightData = await this.storage.get('allOvernightData');
	// 	if (overnightData) {
	// 	  SleepService.AllOvernightData = overnightData.map(this.toOvernightSleepData);
	// 	}
	  
	// 	const sleepinessData = await this.storage.get('allSleepinessData');
	// 	if (sleepinessData) {
	// 	  SleepService.AllSleepinessData = sleepinessData.map(this.toStanfordSleepinessData);
	// 	}
	//   }

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

	// public getLatestOvernightSleepData(): OvernightSleepData {
	// 	return SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1];
	//   }
	
	//   // Method to get the latest sleepiness data
	// public getLatestSleepinessData(): StanfordSleepinessData {
	// 	return SleepService.AllSleepinessData[SleepService.AllSleepinessData.length - 1];
	//   }

	//   public editSleepData(index: number, newData: SleepData) {
	// 	if(index >= 0 && index < SleepService.AllSleepData.length) {
	// 	  const oldData = SleepService.AllSleepData[index];
	
	// 	  // Update the main AllSleepData array
	// 	  SleepService.AllSleepData[index] = newData;
	
	// 	  // Update specific data arrays if necessary
	// 	  if(oldData instanceof OvernightSleepData && newData instanceof OvernightSleepData) {
	// 		const specificIndex = SleepService.AllOvernightData.findIndex(d => d.id === oldData.id);
	// 		if(specificIndex !== -1) {
	// 		  SleepService.AllOvernightData[specificIndex] = newData;
	// 		}
	// 	  } else if(oldData instanceof StanfordSleepinessData && newData instanceof StanfordSleepinessData) {
	// 		const specificIndex = SleepService.AllSleepinessData.findIndex(d => d.id === oldData.id);
	// 		if(specificIndex !== -1) {
	// 		  SleepService.AllSleepinessData[specificIndex] = newData;
	// 		}
	// 	  }
	// 	}
	//   }
	
	//   public deleteSleepData(index: number) {
	// 	if(index >= 0 && index < SleepService.AllSleepData.length) {
	// 	  const dataToDelete = SleepService.AllSleepData[index];
	
	// 	  // Remove from the main AllSleepData array
	// 	  SleepService.AllSleepData.splice(index, 1);
	
	// 	  // Remove from specific data arrays if necessary
	// 	  if(dataToDelete instanceof OvernightSleepData) {
	// 		const specificIndex = SleepService.AllOvernightData.findIndex(d => d.id === dataToDelete.id);
	// 		if(specificIndex !== -1) {
	// 		  SleepService.AllOvernightData.splice(specificIndex, 1);
	// 		}
	// 	  } else if(dataToDelete instanceof StanfordSleepinessData) {
	// 		const specificIndex = SleepService.AllSleepinessData.findIndex(d => d.id === dataToDelete.id);
	// 		if(specificIndex !== -1) {
	// 		  SleepService.AllSleepinessData.splice(specificIndex, 1);
	// 		}
	// 	  }
	// 	}
	//   }


}
