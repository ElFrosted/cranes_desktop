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
        loadChildren: () => import('./features/newService/newService.routes').then((m) => m.NEWSERVICE_ROUTES),
    },
    {
        path: 'services',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
    },
    {
        path: 'files',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/files/files.routes').then((m) => m.FILES_ROUTES),
    },
    {
        path: 'conciliations',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/conciliations/conciliations.routes').then((m) => m.CONCILIATIONS_ROUTES),
    },
    {
        path: 'reports',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
    },
    {
        path: 'ranking',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/ranking/ranking.routes').then((m) => m.RANKING_ROUTES),
    },
    {
        path: 'wachen',
        //TODO descomentar despues
        //canActivate: [authGuard], // proteccion de ruta
        loadChildren: () => import('./features/wachen/wachen.routes').then((m) => m.WACHEN_ROUTES),
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
];
