import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';


const adminRoutes: Routes = [
  {
    path: 'empleados',
    loadChildren: () => import('./views/empleados/empleado.module').then(m => m.EmpleadoModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./views/providers/provider.module').then(m => m.ProviderModule)
  },
  {
    path: 'comisiones',
    loadChildren: () => import('./views/comissions/comission.module').then(m => m.ComissionModule)
  },
  {
    path: 'detalleComs',
    loadChildren: () => import('./views/comissionsDetail/comissionDetail.module').then(m => m.ComissionDetailModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./views/payments/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./views/empleados/empleado.module').then(m => m.EmpleadoModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./views/roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/v1',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },

  {
    path: '',
    component: AdminLayoutSidebarCompactComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
