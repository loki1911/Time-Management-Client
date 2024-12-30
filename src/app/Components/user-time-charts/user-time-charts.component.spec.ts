import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeChartsComponent } from './user-time-charts.component';

describe('UserTimeChartsComponent', () => {
  let component: UserTimeChartsComponent;
  let fixture: ComponentFixture<UserTimeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTimeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
