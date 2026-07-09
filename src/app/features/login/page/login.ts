import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

    isLoading = false;
    errorMessage: string | null = null;

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const { user, password, remember } = this.loginForm.value;

        this.authService.login({ user, password }, remember).subscribe({
            next: ({ defaultRoute }) => {
                this.isLoading = false;

                this.router.navigate([`/${defaultRoute}`]);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage =
                    err.error?.message || err.message || 'Usuario o contraseña incorrectos.';
            },
        });
    }
}
