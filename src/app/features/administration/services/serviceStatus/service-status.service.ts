import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { SaveServiceStatusDTO, ServiceStatusActionResponse, ServiceStatusListResponse, ServiceStatusSingleResponse } from '../../../../shared/interfaces/service-status.interface';

@Injectable({
    providedIn: 'root',
})
export class ServiceStatusService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    // Listar todos los estados de servicio
    getServiceStatuses(): Observable<ServiceStatusListResponse> {
        return this.http.get<ServiceStatusListResponse>(`${this.apiUrl}/estado-servicio`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Obtener un estado de servicio por ID
    getServiceStatusById(id: number): Observable<ServiceStatusSingleResponse> {
        return this.http.get<ServiceStatusSingleResponse>(`${this.apiUrl}/estado-servicio/${id}`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Crear un nuevo estado de servicio
    createServiceStatus(status: SaveServiceStatusDTO): Observable<ServiceStatusActionResponse> {
        return this.http.post<ServiceStatusActionResponse>(`${this.apiUrl}/estado-servicio`, status).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Actualizar un estado de servicio existente
    updateServiceStatus(id: number, status: SaveServiceStatusDTO): Observable<ServiceStatusActionResponse> {
        return this.http.put<ServiceStatusActionResponse>(`${this.apiUrl}/estado-servicio/${id}`, status).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Eliminar / Desactivar estado de servicio
    deleteServiceStatus(id: number): Observable<ServiceStatusActionResponse> {
        return this.http.delete<ServiceStatusActionResponse>(`${this.apiUrl}/estado-servicio/${id}`).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }
}
