import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
    },
    {
        path: 'newService',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'services',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'files',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'conciliations',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'reports',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'ranking',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'wachen',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'dashboard',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
];
