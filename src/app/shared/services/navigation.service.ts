import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../interfaces";
import { RolesService } from "./roles.service";

export interface IMenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string; // Possible values: link/dropDown/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  active?: boolean;
}

export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private readonly userSessionStorageKey = "currentUser";
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false,
  };
  selectedItem: IMenuItem;

  constructor(private rolesService: RolesService) {}

  defaultMenu: IMenuItem[] = [
    {
      name: "Dashboard",
      description: "",
      type: "dropDown",
      icon: "i-Bar-Chart",
      sub: [
        {
          icon: "i-Clock-3",
          name: "Indicadores de Rendimiento",
          state: "/dashboard/v1",
          type: "link",
        },
      ],
    },
    {
      name: "Compras",
      description: "Gestión de Compras",
      type: "dropDown",
      icon: "i-Full-Cart",
      disabled: false,
      sub: [],
    },
    {
      name: "Ventas",
      description: "Gestión de Ventas",
      type: "dropDown",
      icon: "i-Cash-register-2",
      disabled: false,
      sub: [],
    },
    {
      name: "Servicios",
      description: "Gestión de Empleados y Gestión de Comisiones",
      type: "dropDown",
      icon: "i-Files",
      disabled: false,
      sub: [],
    },
    {
      name: "Configuraciones",
      description: "Gestión de Configuraciones ",
      type: "dropDown",
      icon: "i-Gear",
      disabled: false,
      sub: [],
    },
  ];

  getStoredUser(): User | null {
    const storedUser = sessionStorage.getItem(this.userSessionStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  async validateUserModulesPermission() {
    const storedUser = this.getStoredUser();

    var roleResponse

    if (storedUser != null) {
      roleResponse = await this.rolesService
        .getRoleById(storedUser.id_role)
        .toPromise();
    }

    const purchasesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Compras"
    );

    const salesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Ventas"
    );

    const servicesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Servicios"
    );

    const configObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Configuraciones"
    );

    if (roleResponse.modules_role.includes("Proveedores")) {
      const purchaseModuleIndex = this.defaultMenu[
        purchasesObjIndex
      ].sub.findIndex((module) => module.name === "Proveedores");
      if (purchaseModuleIndex === -1) {
        this.defaultMenu[purchasesObjIndex].sub.push({
          icon: "i-Administrator",
          name: "Proveedores",
          state: "/proveedores",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Categorías de Productos")) {
      const purchaseModuleIndex = this.defaultMenu[
        purchasesObjIndex
      ].sub.findIndex((module) => module.name === "Categorías");
      if (purchaseModuleIndex === -1) {
        this.defaultMenu[purchasesObjIndex].sub.push({
          icon: "i-Tag-3",
          name: "Categorías",
          state: "/categories",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Productos")) {
      const purchaseModuleIndex = this.defaultMenu[
        purchasesObjIndex
      ].sub.findIndex((module) => module.name === "Productos");
      if (purchaseModuleIndex === -1) {
        this.defaultMenu[purchasesObjIndex].sub.push({
          icon: "i-File-Clipboard-Text--Image",
          name: "Productos",
          state: "/products",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Compras")) {
      const purchaseModuleIndex = this.defaultMenu[
        purchasesObjIndex
      ].sub.findIndex((module) => module.name === "Compras");
      if (purchaseModuleIndex === -1) {
        this.defaultMenu[purchasesObjIndex].sub.push({
          icon: "i-Full-Cart",
          name: "Compras",
          state: "/purchases",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Pedidos")) {
      const salesModuleIndex = this.defaultMenu[salesObjIndex].sub.findIndex(
        (module) => module.name === "Pedidos"
      );
      if (salesModuleIndex === -1) {
        this.defaultMenu[salesObjIndex].sub.push({
          icon: "i-Jeep",
          name: "Pedidos",
          state: "/orders",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Clientes")) {
      const salesModuleIndex = this.defaultMenu[salesObjIndex].sub.findIndex(
        (module) => module.name === "Clientes"
      );
      if (salesModuleIndex === -1) {
        this.defaultMenu[salesObjIndex].sub.push({
          icon: "i-Business-Mens",
          name: "Clientes",
          state: "/clients",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Empleados")) {
      const servicesModuleIndex = this.defaultMenu[
        servicesObjIndex
      ].sub.findIndex((module) => module.name === "Empleados");
      if (servicesModuleIndex === -1) {
        this.defaultMenu[servicesObjIndex].sub.push({
          icon: "i-Conference",
          name: "Empleados",
          state: "/employees",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Comisiones")) {
      const servicesModuleIndex = this.defaultMenu[
        servicesObjIndex
      ].sub.findIndex((module) => module.name === "Comisiones");
      if (servicesModuleIndex === -1) {
        this.defaultMenu[servicesObjIndex].sub.push({
          icon: "i-Money-2",
          name: "Comisiones",
          state: "/comisiones",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Roles")) {
      const configModuleIndex = this.defaultMenu[configObjIndex].sub.findIndex(
        (module) => module.name === "Roles"
      );
      if (configModuleIndex === -1) {
        this.defaultMenu[configObjIndex].sub.push({
          icon: "i-Key",
          name: "Roles",
          state: "/roles",
          type: "link",
        });
      }
    }

    if (roleResponse.modules_role.includes("Usuarios")) {
      const configModuleIndex = this.defaultMenu[configObjIndex].sub.findIndex(
        (module) => module.name === "Usuarios"
      );
      if (configModuleIndex === -1) {
        this.defaultMenu[configObjIndex].sub.push({
          icon: "i-Male-21",
          name: "Usuarios",
          state: "/users",
          type: "link",
        });
      }
    }

    if (this.defaultMenu[purchasesObjIndex].sub.length == 0) {
      this.defaultMenu[purchasesObjIndex].disabled = true;
    } else {
      this.defaultMenu[purchasesObjIndex].disabled = false;
    }

    if (this.defaultMenu[salesObjIndex].sub.length == 0) {
      this.defaultMenu[salesObjIndex].disabled = true;
    } else {
      this.defaultMenu[salesObjIndex].disabled = false;
    }

    if (this.defaultMenu[servicesObjIndex].sub.length == 0) {
      this.defaultMenu[servicesObjIndex].disabled = true;
    } else {
      this.defaultMenu[servicesObjIndex].disabled = false;
    }

    if (this.defaultMenu[configObjIndex].sub.length == 0) {
      this.defaultMenu[configObjIndex].disabled = true;
    } else {
      this.defaultMenu[configObjIndex].disabled = false;
    }
  }

  cleanItems() {
    const purchasesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Compras"
    );

    const salesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Ventas"
    );

    const servicesObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Servicios"
    );

    const configObjIndex = this.defaultMenu.findIndex(
      (item: IMenuItem) => item.name === "Configuraciones"
    );

    this.defaultMenu[purchasesObjIndex].sub.splice(
      0,
      this.defaultMenu[purchasesObjIndex].sub.length
    );

    this.defaultMenu[salesObjIndex].sub.splice(
      0,
      this.defaultMenu[salesObjIndex].sub.length
    );

    this.defaultMenu[servicesObjIndex].sub.splice(
      0,
      this.defaultMenu[servicesObjIndex].sub.length
    );

    this.defaultMenu[configObjIndex].sub.splice(
      0,
      this.defaultMenu[configObjIndex].sub.length
    );
  }

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // You can customize this method to supply different menu for
  // different user type.
  // publishNavigationChange(menuType: string) {
  //   switch (userType) {
  //     case 'admin':
  //       this.menuItems.next(this.adminMenu);
  //       break;
  //     case 'user':
  //       this.menuItems.next(this.userMenu);
  //       break;
  //     default:
  //       this.menuItems.next(this.defaultMenu);
  //   }
  // }
}
