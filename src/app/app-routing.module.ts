import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';


const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
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
    loadChildren: () => import('./views/products/product.module').then(m => m.ProductModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./views/clients/client.module').then(m => m.ClientModule)
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
