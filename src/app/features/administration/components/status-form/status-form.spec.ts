import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusForm } from './status-form';

describe('StatusForm', () => {
    let component: StatusForm;
    let fixture: ComponentFixture<StatusForm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatusForm],
        }).compileComponents();

        fixture = TestBed.createComponent(StatusForm);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
