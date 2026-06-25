import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingServices } from './pending-services';

describe('PendingServices', () => {
    let component: PendingServices;
    let fixture: ComponentFixture<PendingServices>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PendingServices],
        }).compileComponents();

        fixture = TestBed.createComponent(PendingServices);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
