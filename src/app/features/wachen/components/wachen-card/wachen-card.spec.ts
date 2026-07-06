import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WachenCard } from './wachen-card';

describe('WachenCard', () => {
    let component: WachenCard;
    let fixture: ComponentFixture<WachenCard>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WachenCard],
        }).compileComponents();

        fixture = TestBed.createComponent(WachenCard);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
