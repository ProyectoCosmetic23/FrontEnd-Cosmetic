import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvidersDetailComponent } from './provider-detail.component';

describe('ProviderDetailComponent', () => {
  let component: ProvidersDetailComponent;
  let fixture: ComponentFixture<ProvidersDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
