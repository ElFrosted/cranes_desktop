import { Component } from '@angular/core';
import { Card } from "../../../shared/components/card/card";
import { RankCard } from "../components/rank-card/rank-card";

@Component({
    selector: 'app-ranking',
    imports: [Card, RankCard],
    templateUrl: './ranking.html',
    styleUrl: './ranking.scss',
})
export class Ranking {}
