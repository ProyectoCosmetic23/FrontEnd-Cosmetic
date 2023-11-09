import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}


export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;
    
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {
            name: 'Dashboard',
            description: '',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Version 1', state: '/dashboard/v1', type: 'link' },

            ]
        },
        
        {
            name: 'Compras',
            description: 'Gestión de Compras',
            type: 'dropDown',
            icon: 'i-Full-Cart',
            sub: [
                { icon: 'i-Administrator', name: 'Proveedores', state: '/providers', type: 'link' },
                { icon: 'i-Tag-3', name: 'Categories', state: '/categories', type: 'link' },
                { icon: 'i-File-Clipboard-Text--Image', name: 'Products', state: '/products', type: 'link' },
                { icon: 'i-Full-Cart', name: 'Compras', state: '/purchases', type: 'link' },
            ]
        },
        {
            name: 'Ventas',
            description: 'Gestión de Compras',
            type: 'dropDown',
            icon: 'i-Cash-register-2',
            sub: [
                { icon: 'i-Jeep', name: 'Pedidos', state: '/invoice', type: 'link' },
                { icon: 'i-Money1', name: 'Ventas', state: '/categories', type: 'link' },
                { icon: 'i-Remove-Cart', name: 'Devoluciones', state: '/chat', type: 'link' },
                { icon: 'i-Full-Cart', name: 'Clientes', state: '/calendar', type: 'link' },
            ]
        },
        {
            name: 'Servicios',
            description: 'Este apartado se encuentra el modulo de Empleados,Comisiones y Usuarios',
            type: 'dropDown',
            icon: 'i-Files',
            sub: [

                { icon: 'i-Conference', name: 'Empleados', state: '/empleados', type: 'link' },
                { icon: 'i-Money-2', name: 'Comisiones', state: 'por arreglar', type: 'link' },

            ]
        },
        {
            name: 'Configuraciones',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Gear',
            sub: [
                { icon: 'i-Error-404-Window', name: 'Roles', state: '/others/404', type: 'link' },
                { icon: 'i-Error-404-Window', name: 'Usuarios', state: '/others/404', type: 'link' },
            ]
        },


    ];


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
