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
    path: "proveedores",
    canActivate:[AuthGuard],

    loadChildren: () =>
      import("./views/providers/provider.module").then((m) => m.ProviderModule),
  },
  {
    path: 'comisiones',
    canActivate:[AuthGuard],
    loadChildren: () => import('./views/comissions/comission.module').then(m => m.ComissionModule)
  },
  {
    path: "detalleComs",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/comissionsDetail/comissionDetail.module").then(
        (m) => m.ComissionDetailModule
      ),
  },
  {
    path: "pagos",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/payments/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "roles",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "orders",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "employees",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/employees/employee.module").then((m) => m.EmployeeModule),
  },
  {
    path: 'products',
    canActivate:[AuthGuard],
    loadChildren: () => import('./views/products/product.module').then(m => m.ProductModule)
  },
  {
    path: "purchases",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/purchases/purchase.module").then((m) => m.PurchaseModule),
  },
  {
    path: "categories",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/categorias/category.module").then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: "clients",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/clients/client.module").then((m) => m.ClientModule),
  },
  {
    path: "users",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/users/user.module").then((m) => m.UserModule),
  },
  {
    path: "returns",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./views/returns/returns.module").then((m) => m.ReturnsModule),
  },

 
  // ... otras rutas
];


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],  // Agregado para verificar la autenticación al cargar la página de inicio
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutSidebarCompactComponent,
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'dashboard/v1'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule {}