import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowLoggedOvernightSleepPage } from './show-logged-overnight-sleep.page';

describe('ShowLoggedOvernightSleepPage', () => {
  let component: ShowLoggedOvernightSleepPage;
  let fixture: ComponentFixture<ShowLoggedOvernightSleepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowLoggedOvernightSleepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
