import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefectiveProductListComponent } from './defective-product-list-component';

describe('DefectiveProductListComponent', () => {
  let component: DefectiveProductListComponent;
  let fixture: ComponentFixture<DefectiveProductListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefectiveProductListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectiveProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});