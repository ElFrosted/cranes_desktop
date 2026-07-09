import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        return router.parseUrl('/login');
    }

    const targetPath = route.routeConfig?.path;

    if (authService.hasPermissionForRoute(targetPath)) {
        return true;
    }

    const allowedRoutes = authService.getUserRoutesFromStorage();

    if (allowedRoutes.length > 0) {
        const defaultPath = allowedRoutes[0].nombre.replace(/^\//, '');
        return router.parseUrl(`/${defaultPath}`);
    }

    return router.parseUrl('/login');
};
