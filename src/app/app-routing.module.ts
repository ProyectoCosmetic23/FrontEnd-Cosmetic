import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./views/providers/provider.module').then(m => m.ProviderModule)
  },
  {
    path: 'comissions',
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
    path: 'roles',
    loadChildren: () => import('./views/roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./views/employees/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'products',
    canActivate:[AuthGuard],
    loadChildren: () => import('./views/products/product.module').then(m => m.ProductModule)
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],  // Agregado para verificar la autenticación al cargar la página de inicio
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
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'dashboard/v1'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
