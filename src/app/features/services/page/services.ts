import { Component } from '@angular/core';
import { Card } from "../../../shared/components/card/card";
import { PendingServices } from "../components/pending-services/pending-services";

@Component({
    selector: 'app-services',
    imports: [Card, PendingServices],
    templateUrl: './services.html',
    styleUrl: './services.scss',
})
export class Services {}
