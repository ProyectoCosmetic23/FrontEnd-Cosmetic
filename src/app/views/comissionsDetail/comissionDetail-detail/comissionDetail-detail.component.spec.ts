import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComissionsDetailDetailComponent } from './comissionDetail-detail.component';

describe('ComissionDetailDetailComponent', () => {
  let component: ComissionsDetailDetailComponent;
  let fixture: ComponentFixture<ComissionsDetailDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionsDetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionsDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
