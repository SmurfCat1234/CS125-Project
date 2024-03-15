import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommend-routing.module';

import { RecommendationsPage } from './recommend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsPageRoutingModule
  ],
  declarations: [RecommendationsPage]
})
export class RecommendationsPageModule {}
