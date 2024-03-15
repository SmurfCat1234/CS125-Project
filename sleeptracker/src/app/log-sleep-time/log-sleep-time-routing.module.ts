import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogSleepTimePage } from './log-sleep-time.page';

const routes: Routes = [
  {
    path: '',
    component: LogSleepTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogSleepTimePageRoutingModule {}
