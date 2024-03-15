import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {

		
		var sleepStart_ms = new Date(this.sleepStart).getTime();
		var sleepEnd_ms = new Date(this.sleepEnd).getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hrs, " + Math.floor(difference_ms / (1000*60) % 60) + " mins";
	}



	override 	dateString():string {
		var date = new Date(this.sleepStart);
		return date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
	}

	getSleepDuration(): number {
		return (this.sleepEnd.getTime() - this.sleepStart.getTime()) / (1000 * 60 * 60); // Returns duration in hours
	  }
}

