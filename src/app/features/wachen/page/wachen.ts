import { Component } from '@angular/core';
import { Card } from "../../../shared/components/card/card";
import { WachenCard } from "../components/wachen-card/wachen-card";

@Component({
    selector: 'app-wachen',
    imports: [Card, WachenCard],
    templateUrl: './wachen.html',
    styleUrl: './wachen.scss',
})
export class Wachen {}
