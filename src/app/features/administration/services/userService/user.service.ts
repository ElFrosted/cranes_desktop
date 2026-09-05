import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
    CreateUserDTO,
    UpdateUserDTO,
    UserActionResponse,
    UserInitDataResponse,
    UserListResponse,
    UserSingleResponse,
} from '../../../../shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    // Obtener parámetros iniciales (tipos documento, roles)
    getInitData(): Observable<UserInitDataResponse> {
        return this.http.get<UserInitDataResponse>(`${this.apiUrl}/user/parametros-usuarios`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Listar todos los usuarios
    getUsers(): Observable<UserListResponse> {
        return this.http.get<UserListResponse>(`${this.apiUrl}/user`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Obtener un usuario por ID
    getUserById(id: number): Observable<UserSingleResponse> {
        return this.http.get<UserSingleResponse>(`${this.apiUrl}/user/${id}`).pipe(
            map((res) => {
                if (!res.success || !res.data) throw res;
                return res;
            })
        );
    }

    // Crear un nuevo usuario
    createUser(user: CreateUserDTO): Observable<UserActionResponse> {
        return this.http.post<UserActionResponse>(`${this.apiUrl}/user`, user).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Actualizar un usuario existente
    updateUser(id: number, user: UpdateUserDTO): Observable<UserActionResponse> {
        return this.http.put<UserActionResponse>(`${this.apiUrl}/user/${id}`, user).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }

    // Eliminar / Desactivar usuario
    deleteUser(id: number): Observable<UserActionResponse> {
        return this.http.delete<UserActionResponse>(`${this.apiUrl}/user/${id}`).pipe(
            map((res) => {
                if (!res.success) throw res;
                return res;
            })
        );
    }
}
