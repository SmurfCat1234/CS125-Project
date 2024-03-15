import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowLoggedSleepinessLevelsPage } from './show-logged-sleepiness-levels.page';

describe('ShowLoggedSleepinessLevelsPage', () => {
  let component: ShowLoggedSleepinessLevelsPage;
  let fixture: ComponentFixture<ShowLoggedSleepinessLevelsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowLoggedSleepinessLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
