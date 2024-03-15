import { Component, OnInit } from '@angular/core';

import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-show-logged-sleepiness-levels',
  templateUrl: './show-logged-sleepiness-levels.page.html',
  styleUrls: ['./show-logged-sleepiness-levels.page.scss'],
})
export class ShowLoggedSleepinessLevelsPage implements OnInit {
  sleepinessData: StanfordSleepinessData[] = [];

  constructor(public sleepService:SleepService) {}

  ngOnInit() {

    this.sleepinessData = this.sleepService.getSleepinessData();
    // retrieve sleepiness data
    
  }
}
