import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup = this.fb.group({
        user: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [false],
    });

    errorMessage = signal<string | null>(null);
    isLoading = signal<boolean>(false);

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.errorMessage.set(null);
        this.isLoading.set(true);

        const { user, password, remember } = this.loginForm.value;

        this.authService.login({ user, password }, remember).subscribe({
            next: ({ defaultRoute }) => {
                this.isLoading.set(false);

                this.router.navigate([`/${defaultRoute}`]);
            },
            error: (err) => {
                this.isLoading.set(false);

                // Capturamos el objeto de respuesta de la API (si viene de Express/HTTP o directo de la excepción)
                const apiRes: ApiResponse<null> | null = err.error || err;

                if (apiRes?.showsMessage && apiRes?.message) {
                    this.errorMessage.set(apiRes.message);
                } else {
                    this.errorMessage.set('Credenciales inválidas o error de conexión.');
                }
            },
        });
    }
}
