import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
    SaveVehicleDTO,
    VehicleActionResponse,
    VehicleInitDataResponse,
    VehicleListResponse,
    VehicleSingleResponse,
} from '../../../../shared/interfaces/vehicle.interface';

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    //Obtener los parametros iniciales
    getInitData(): Observable<VehicleInitDataResponse> {
        return this.http
            .get<VehicleInitDataResponse>(`${this.apiUrl}/vehiculo/parametros-vehiculos`)
            .pipe(
                map((res) => {
                    if (!res.success || !res.data) throw res;
                    return res;
                })
            );
    }

    //Listar todos los vehiculos
    getVehicles(): Observable<VehicleListResponse> {
        return this.http.get<VehicleListResponse>(`${this.apiUrl}/vehiculo`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Obtener un vehiculo por Id
    getVehicleById(id: number): Observable<VehicleSingleResponse> {
        return this.http.get<VehicleSingleResponse>(`${this.apiUrl}/vehiculo/${id}`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Crear un nuevo vehículo
    createVehicle(vehicle: SaveVehicleDTO): Observable<VehicleActionResponse> {
        return this.http.post<VehicleActionResponse>(`${this.apiUrl}/vehiculo`, vehicle).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Actualizar un vehículo existente
    updateVehicle(id: number, vehicle: SaveVehicleDTO): Observable<VehicleActionResponse> {
        return this.http.put<VehicleActionResponse>(`${this.apiUrl}/vehiculo/${id}`, vehicle).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Eliminar / Desactivar vehículo
    deleteVehicle(id: number): Observable<VehicleActionResponse> {
        return this.http.delete<VehicleActionResponse>(`${this.apiUrl}/vehiculo/${id}`).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }
}
