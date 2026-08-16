import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceInitData } from '../../../shared/interfaces/newService.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NewServiceService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    getServiceInitData(): Observable<ServiceInitData> {
        return this.http.get<ServiceInitData>(`${this.apiUrl}/servicio/parametros-administracion`);
    }
}
