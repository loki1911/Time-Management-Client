import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimeComponent } from './admin-time.component';

describe('AdminTimeComponent', () => {
  let component: AdminTimeComponent;
  let fixture: ComponentFixture<AdminTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
