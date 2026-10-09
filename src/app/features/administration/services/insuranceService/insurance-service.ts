import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { InsuranceActionResponse, InsuranceListResponse, InsuranceSingleResponse, SaveInsuranceDTO } from '../../../../shared/interfaces/insurance-interface';

@Injectable({
    providedIn: 'root',
})
export class InsuranceService {
    private http = inject(HttpClient)
    private readonly apiUrl = environment.apiUrl

    // Obtener lista de aseguradoras
    getInsurances(): Observable<InsuranceListResponse> {
        return this.http.get<InsuranceListResponse>(`${this.apiUrl}/aseguradora`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        )
    }

    // Obtener una aseguradora
    getInsuranceById(id: number): Observable<InsuranceSingleResponse> {
        return this.http.get<InsuranceSingleResponse>(`${this.apiUrl}/aseguradora/${id}`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        )
    }

    // Crear una aseguradora
    createInsurance(insurance: SaveInsuranceDTO): Observable<InsuranceActionResponse> {
        return this.http.post<InsuranceActionResponse>(`${this.apiUrl}/aseguradora`, insurance).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        )
    }

    // Actualizar la aseguradora
    updateInsurance(id: number, insurance: SaveInsuranceDTO): Observable<InsuranceActionResponse> {
        return this.http.put<InsuranceActionResponse>(`${this.apiUrl}/aseguradora/${id}`, insurance).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        )
    }

    // Eliminar la aseguradora
    deleteInsurance(id: number): Observable<InsuranceActionResponse> {
        return this.http.delete<InsuranceActionResponse>(`${this.apiUrl}/aseguradora/${id}`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        )
    }
}
