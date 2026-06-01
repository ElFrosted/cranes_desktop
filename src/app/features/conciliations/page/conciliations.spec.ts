import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conciliations } from './conciliations';

describe('Conciliations', () => {
    let component: Conciliations;
    let fixture: ComponentFixture<Conciliations>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Conciliations],
        }).compileComponents();

        fixture = TestBed.createComponent(Conciliations);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
