import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DefectiveProductDetailComponent } from './defective-product-detail.component';

describe('DefectiveProductDetailComponent', () => {
  let component: DefectiveProductDetailComponent;
  let fixture: ComponentFixture<DefectiveProductDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectiveProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectiveProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});