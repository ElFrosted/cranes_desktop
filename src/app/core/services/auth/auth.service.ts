import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
    LoginRequest,
    LoginResponse,
    AuthUserData,
    MenuItem,
    UserRoutesResponse,
} from '../../model/auth.models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    login(
        credentials: LoginRequest,
        remember: boolean
    ): Observable<{ defaultRoute: string; routes: MenuItem[] }> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/user/login`, credentials).pipe(
            switchMap((loginRes) => {
                if (!loginRes.success || !loginRes.data.accessToken) {
                    throw new Error(loginRes.message || 'Error de autenticación');
                }

                const authData = loginRes.data;
                this.saveSession(authData, remember);

                return this.getUserRoutes(authData.accessToken).pipe(
                    map((routesRes) => {
                        const routes = routesRes.data || [];
                        const defaultRoute = routes.length > 0 ? routes[0].nombre : 'newService'; //TODO Revisar que hacer si no devuelve ninguna ruta

                        this.saveUserRoutes(routes);

                        return {
                            defaultRoute,
                            routes,
                        };
                    })
                );
            })
        );
    }

    getUserRoutes(token?: string): Observable<UserRoutesResponse> {
        const authToken = token || this.getToken();
        const headers = new HttpHeaders({
            Authorization: `Bearer ${authToken}`,
        });

        return this.http.get<UserRoutesResponse>(`${this.apiUrl}/menu`, { headers });
    }

    private saveSession(authData: AuthUserData, remember: boolean): void {
        const storage = remember ? localStorage : sessionStorage;

        storage.setItem('auth_token', authData.accessToken);
        storage.setItem('user_id', authData.usuarioId.toString());
        storage.setItem('user_doc', authData.documento);
    }

    private saveUserRoutes(routes: MenuItem[]): void {
        localStorage.setItem('user_routes', JSON.stringify(routes));
    }

    getUserRoutesFromStorage(): MenuItem[] {
        const routes = localStorage.getItem('user_routes');
        return routes ? JSON.parse(routes) : [];
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }

    getUserId(): string | null {
        return localStorage.getItem('user_id') || sessionStorage.getItem('user_id');
    }

    hasPermissionForRoute(path: string | undefined): boolean {
        if (!path) return false;

        const allowedRoutes = this.getUserRoutesFromStorage();

        return allowedRoutes.some((route) => route.nombre.toLowerCase() === path.toLowerCase());
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token') || !!sessionStorage.getItem('auth_token');
    }

    logout(): void {
        localStorage.clear();
        sessionStorage.clear();
    }
}
