import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentsDetailComponent } from './payment-detail.component';

describe('PaymentDetailComponent', () => {
  let component: PaymentsDetailComponent;
  let fixture: ComponentFixture<PaymentsDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
