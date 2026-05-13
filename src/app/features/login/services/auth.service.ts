import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { Auth } from '../../../shared/interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    private router = inject(Router);
    private http = inject(HttpClient);

    private isLoggedIn = signal<boolean>(!!localStorage.getItem('token')); //TODO si no me dan token, tengo que cambiar la forma que comprobar si esta logueado

    login(credentials: Partial<User>): Observable<Auth> {
        //TODO cambiar en caso de que me pongan a chupar monda
        return this.http.post<Auth>(`${this.apiUrl}/users/login`, credentials).pipe(
            tap((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token); //TODO pedir que me den un token
                    this.isLoggedIn.set(true);
                }
            })
        );
    }

    isLogged() {
        return this.isLoggedIn();
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }
}
