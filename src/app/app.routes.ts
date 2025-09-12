import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            { path: 'login', redirectTo: '', pathMatch: 'full' },
            {
                path: 'forgot-password',
                loadComponent: () => import('./pages/authentication/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
            },
        ]
    },
    {
        path: 'main',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [

            {
                path: '',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            { path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },


    {
        path: '**',
        loadComponent: () => import('./pages/common/notfound/notfound.component').then(m => m.NotfoundComponent),
    }

];
