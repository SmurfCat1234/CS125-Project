import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sleep-data-visualization',
  templateUrl: './sleep-data-visualization.component.html',
  styleUrls: ['./sleep-data-visualization.component.scss'],
})
export class SleepDataVisualization implements OnInit {
  @Input() sleepData: any[] | undefined; // Replace with appropriate type

  ngOnInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = (document.getElementById('sleepChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.sleepData?.map(data => data.date),
          datasets: [
            {
              label: 'Sleep Duration',
              data: this.sleepData?.map(data => data.duration),
              borderColor: 'blue',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Duration (hours)'
              }
            }
          }
        }
      });
    }
  }
}