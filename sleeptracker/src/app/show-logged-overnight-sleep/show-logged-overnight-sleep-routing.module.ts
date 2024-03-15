import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLoggedOvernightSleepPage } from './show-logged-overnight-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: ShowLoggedOvernightSleepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowLoggedOvernightSleepPageRoutingModule {}
