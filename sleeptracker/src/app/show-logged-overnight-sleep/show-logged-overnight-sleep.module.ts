import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowLoggedOvernightSleepPageRoutingModule } from './show-logged-overnight-sleep-routing.module';

import { ShowLoggedOvernightSleepPage } from './show-logged-overnight-sleep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowLoggedOvernightSleepPageRoutingModule
  ],
  declarations: [ShowLoggedOvernightSleepPage]
})
export class ShowLoggedOvernightSleepPageModule {}
