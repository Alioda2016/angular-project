import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRatingScaleComponent } from './select-rating-scale.component';

describe('SelectRatingScaleComponent', () => {
  let component: SelectRatingScaleComponent;
  let fixture: ComponentFixture<SelectRatingScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRatingScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRatingScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
