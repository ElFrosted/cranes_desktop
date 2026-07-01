import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCard } from './rank-card';

describe('RankCard', () => {
    let component: RankCard;
    let fixture: ComponentFixture<RankCard>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RankCard],
        }).compileComponents();

        fixture = TestBed.createComponent(RankCard);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
