import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowLoggedSleepinessLevelsPageRoutingModule } from './show-logged-sleepiness-levels-routing.module';

import { ShowLoggedSleepinessLevelsPage } from './show-logged-sleepiness-levels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowLoggedSleepinessLevelsPageRoutingModule
  ],
  declarations: [ShowLoggedSleepinessLevelsPage]
})
export class ShowLoggedSleepinessLevelsPageModule {}
