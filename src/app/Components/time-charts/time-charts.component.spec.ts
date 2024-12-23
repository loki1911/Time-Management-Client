import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartsComponent } from './time-charts.component';

describe('TimeChartsComponent', () => {
  let component: TimeChartsComponent;
  let fixture: ComponentFixture<TimeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
