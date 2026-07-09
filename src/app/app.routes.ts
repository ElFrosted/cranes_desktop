import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
    },
    {
        path: 'newService',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/newService/newService.routes').then((m) => m.NEWSERVICE_ROUTES),
    },
    {
        path: 'services',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
    },
    {
        path: 'files',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/files/files.routes').then((m) => m.FILES_ROUTES),
    },
    {
        path: 'conciliations',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/conciliations/conciliations.routes').then((m) => m.CONCILIATIONS_ROUTES),
    },
    {
        path: 'reports',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
    },
    {
        path: 'ranking',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/ranking/ranking.routes').then((m) => m.RANKING_ROUTES),
    },
    {
        path: 'wachen',
        canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/wachen/wachen.routes').then((m) => m.WACHEN_ROUTES),
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
];
