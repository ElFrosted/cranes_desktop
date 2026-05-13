import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
    private apiUrl = ''; //TODO agregar una url
    private http = inject(HttpClient);

    //TODO implementar interfaces para credentials
    login(credentials: any) {
        //                TODO | cambiar ese any por una interfaz con el tipo de dato que espero recibir
        return this.http.post<any>(`${this.apiUrl}`, credentials).pipe(
            tap((response) => {
                localStorage.setItem('token', response.token); //TODO hablar para ver que tipo de datos recibo
                this._isAuthenticated.set(true);
            })
        );
    }

    logout() {
        localStorage.removeItem('toke');
        this._isAuthenticated.set(false);
    }

    isLoggedIn() {
        return this._isAuthenticated();
    }
}
