import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wachen } from './wachen';

describe('Wachen', () => {
    let component: Wachen;
    let fixture: ComponentFixture<Wachen>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Wachen],
        }).compileComponents();

        fixture = TestBed.createComponent(Wachen);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
