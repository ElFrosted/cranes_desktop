import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceForm } from './insurance-form';

describe('InsuranceForm', () => {
    let component: InsuranceForm;
    let fixture: ComponentFixture<InsuranceForm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InsuranceForm],
        }).compileComponents();

        fixture = TestBed.createComponent(InsuranceForm);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
