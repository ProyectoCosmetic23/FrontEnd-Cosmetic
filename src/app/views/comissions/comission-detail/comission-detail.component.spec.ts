import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComissionsDetailComponent } from './comission-detail.component';

describe('ProviderDetailComponent', () => {
  let component: ComissionsDetailComponent;
  let fixture: ComponentFixture<ComissionsDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
