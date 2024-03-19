import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SleepService } from '../services/sleep.service';
import { Router, NavigationEnd } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit, AfterViewInit {

  constructor(public sleepService: SleepService, private router: Router,private eventService: EventService) {}

  ngOnInit() {

    this.eventService.dataImported.subscribe(() => {
      this.initSleepChart();
      this.initSleepinessChart();
    });
  }

  ngAfterViewInit() {
    this.initSleepChart();
    this.initSleepinessChart();
  }

  initSleepChart() {
    const sleepData = this.sleepService.getOvernightSleepData();
    const ctx = (document.getElementById('sleepChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) { // Check that ctx is not null
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sleepData.map(data => data.dateString()), // Use dateString() for labels
          datasets: [{
            label: 'Sleep Duration (hours)',
            data: sleepData.map(data => data.getSleepDuration()),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }

    );
    }
    else {
      console.error('Failed to get canvas context');
    }
  }

  initSleepinessChart() {
    const sleepinessData = this.sleepService.getSleepinessData();
    const ctx = (document.getElementById('sleepinessChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) { // Check that ctx is not null
    new Chart(ctx, {
        type: 'line',
        data: {
          labels: sleepinessData.map(data => data.timeString()), // Use custom timeString() for labels
          datasets: [{
            label: 'Sleepiness Level',
            data: sleepinessData.map(data => data.getLoggedValue()),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 7 // Sleepiness scale is 1-7
            }
          }
        }
      });
    }
    else {
      console.error('Failed to get canvas context');
    }
  }
}
