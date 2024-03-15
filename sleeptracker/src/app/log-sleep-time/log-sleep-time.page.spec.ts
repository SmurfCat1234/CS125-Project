import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogSleepTimePage } from './log-sleep-time.page';

describe('LogSleepTimePage', () => {
  let component: LogSleepTimePage;
  let fixture: ComponentFixture<LogSleepTimePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LogSleepTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
