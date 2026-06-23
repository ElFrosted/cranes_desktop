import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSaved } from './service-saved';

describe('ServiceSaved', () => {
    let component: ServiceSaved;
    let fixture: ComponentFixture<ServiceSaved>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServiceSaved],
        }).compileComponents();

        fixture = TestBed.createComponent(ServiceSaved);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
