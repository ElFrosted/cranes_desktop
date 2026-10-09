import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

interface NavItem {
    label: string;
    route: string;
    icon: string;
    count?: number; // Para contadores dinámicos
}
@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    private allNavItems: NavItem[] = [
        { label: 'Nuevo Servicio', route: 'newService', icon: '➕' },
        { label: 'Servicios Pendientes', route: 'services', icon: '🔄', count: 0 },
        { label: 'Expedientes', route: 'files', icon: '📋', count: 0 },
        { label: 'Conciliación', route: 'conciliations', icon: '🔗' },
        { label: 'Informes', route: 'reports', icon: '📊' },
        { label: 'Ranking', route: 'ranking', icon: '🏆' },
        { label: 'Custodias', route: 'wachen', icon: '🔒', count: 0 },
    ];

    visibleNavItems: NavItem[] = [];

    ngOnInit(): void {
        this.filterMenuByPermissions();
    }

    private filterMenuByPermissions(): void {
        const allowedRoutes = this.authService.getUserRoutesFromStorage();

        this.visibleNavItems = this.allNavItems.filter((item) =>
            allowedRoutes.some(
                (allowed) => allowed.nombre.toLowerCase() === item.route.toLowerCase()
            )
        );
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
