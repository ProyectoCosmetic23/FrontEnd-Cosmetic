import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdersDetailComponent } from './sales-detail.component';

describe('OrdersDetailComponent', () => {
    let component: OrdersDetailComponent;
    let fixture: ComponentFixture<OrdersDetailComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ OrdersDetailComponent ]
      })  
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })
});