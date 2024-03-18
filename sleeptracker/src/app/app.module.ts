import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';
import { customTransition } from './animations/custom-animation';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TabsPageModule } from './tabs/tabs.module'; // Import TabsPageModule

import { SleepDataLogger } from './sleep-data-logger/sleep-data-logger.component';
import { SleepDataVisualization } from './sleep-data-visualization/sleep-data-visualization.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    
    SleepDataLogger,
    SleepDataVisualization,
    
  ],
  
  imports: [BrowserModule,HttpClientModule,BrowserAnimationsModule, IonicModule.forRoot({navAnimation: customTransition}), AppRoutingModule,FormsModule,IonicStorageModule.forRoot(),TabsPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
