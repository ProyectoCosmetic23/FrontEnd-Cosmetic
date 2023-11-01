import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RolesDetailComponent } from './roles-detail.component';

describe('RolesDetailComponent', () => {
    let component: RolesDetailComponent;
    let fixture: ComponentFixture<RolesDetailComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ RolesDetailComponent ]
      })  
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })
});