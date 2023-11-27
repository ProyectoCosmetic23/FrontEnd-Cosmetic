import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReturnsDetailComponent } from './returns-detail.component';

describe('ReturnsDetailComponent', () => {
    let component: ReturnsDetailComponent;
    let fixture: ComponentFixture<ReturnsDetailComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ ReturnsDetailComponent ]
      })  
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReturnsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })
});

