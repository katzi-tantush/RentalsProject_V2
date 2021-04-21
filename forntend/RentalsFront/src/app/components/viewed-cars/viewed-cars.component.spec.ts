import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedCarsComponent } from './viewed-cars.component';

describe('ViewedCarsComponent', () => {
  let component: ViewedCarsComponent;
  let fixture: ComponentFixture<ViewedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewedCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
