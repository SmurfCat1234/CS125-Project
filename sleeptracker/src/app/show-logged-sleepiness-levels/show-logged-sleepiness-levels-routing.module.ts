import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLoggedSleepinessLevelsPage } from './show-logged-sleepiness-levels.page';

const routes: Routes = [
  {
    path: '',
    component: ShowLoggedSleepinessLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowLoggedSleepinessLevelsPageRoutingModule {}
