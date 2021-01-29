import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTurnoverAmountElementComponent } from './add-new-turnover-amount-element.component';

describe('AddNewTurnoverAmountElementComponent', () => {
  let component: AddNewTurnoverAmountElementComponent;
  let fixture: ComponentFixture<AddNewTurnoverAmountElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTurnoverAmountElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTurnoverAmountElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
