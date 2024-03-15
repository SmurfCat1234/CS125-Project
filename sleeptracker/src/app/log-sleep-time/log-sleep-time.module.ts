import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogSleepTimePageRoutingModule } from './log-sleep-time-routing.module';

import { LogSleepTimePage } from './log-sleep-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogSleepTimePageRoutingModule
  ],
  declarations: [LogSleepTimePage]
})
export class LogSleepTimePageModule {}
