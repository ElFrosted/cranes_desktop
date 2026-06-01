import { Component } from '@angular/core';
import { Card } from "../../../shared/components/card/card";

@Component({
    selector: 'app-dashboard',
    imports: [Card],
    templateUrl: './newService.html',
    styleUrl: './newService.scss',
})
export class NewService {}
