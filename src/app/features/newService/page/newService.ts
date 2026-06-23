import { Component } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { ServiceSaved } from '../components/service-saved/service-saved';

@Component({
    selector: 'app-dashboard',
    imports: [Card, ServiceSaved],
    templateUrl: './newService.html',
    styleUrl: './newService.scss',
})
export class NewService {}
