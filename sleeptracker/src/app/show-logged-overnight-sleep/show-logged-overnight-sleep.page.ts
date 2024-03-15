import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-show-logged-overnight-sleep',
  templateUrl: './show-logged-overnight-sleep.page.html',
  styleUrls: ['./show-logged-overnight-sleep.page.scss'],
})
export class ShowLoggedOvernightSleepPage implements OnInit {

  overnightSleepData: OvernightSleepData[] = [];

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
    this.overnightSleepData = this.sleepService.getOvernightSleepData();
    // retrieve overnight sleep data
  }

}
