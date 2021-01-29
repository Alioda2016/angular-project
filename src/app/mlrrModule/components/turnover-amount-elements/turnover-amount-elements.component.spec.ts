import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoverAmountElementsComponent } from './turnover-amount-elements.component';

describe('TurnoverAmountElementsComponent', () => {
  let component: TurnoverAmountElementsComponent;
  let fixture: ComponentFixture<TurnoverAmountElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoverAmountElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoverAmountElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
