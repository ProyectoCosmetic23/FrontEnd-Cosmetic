import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriaDetailComponent } from './categoria-detail.component';

describe('CategoriaDetailComponent', () => {
  let component: CategoriaDetailComponent;
  let fixture: ComponentFixture<CategoriaDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
