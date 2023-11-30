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
                { icon: 'i-Clock-3', name: 'Indicadores de Rendimiento', state: '/dashboard/v1', type: 'link' },

            ]
        },
        // {
        //     name: 'Sessions',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        //     type: 'dropDown',
        //     icon: 'i-Administrator',
        //     sub: [
        //         { icon: 'i-Add-User', name: 'Sign up', state: '/sessions/signup', type: 'link' },
        //         { icon: 'i-Checked-User', name: 'Sign in', state: '/sessions/signin', type: 'link' },
        //         { icon: 'i-Find-User', name: 'Forgot', state: '/sessions/forgot', type: 'link' }
        //     ]
        // },
        {
            name: 'Compras',
            description: 'Gestión de Compras',
            type: 'dropDown',
            icon: 'i-Full-Cart',
            sub: [
                { icon: 'i-Administrator', name: 'Proveedores', state: '/proveedores', type: 'link' },
                { icon: 'i-Tag-3', name: 'Categorías', state: '/categories', type: 'link' },
                { icon: 'i-File-Clipboard-Text--Image', name: 'Productos', state: '/products', type: 'link' },
                { icon: 'i-Full-Cart', name: 'Compras', state: '/purchases', type: 'link' },
            ]
        },
        {
            name: 'Ventas',
            description: 'Gestión de Ventas',
            type: 'dropDown',
            icon: 'i-Cash-register-2',
            sub: [
                { icon: 'i-Jeep', name: 'Pedidos', state: '/orders', type: 'link' },
                { icon: 'i-Remove-Cart', name: 'Devoluciones', state: '/defective-products', type: 'link' },
                { icon: 'i-Conference', name: 'Clientes', state: '/clients', type: 'link' },
             
            ]
        },
        {
            name: 'Servicios',
            description: 'Gestión de Empleados y Gestión de Comisiones',
            type: 'dropDown',
            icon: 'i-Files',
            sub: [
                { icon: 'i-Conference', name: 'Empleados', state: '/employees', type: 'link' },
                { icon: 'i-Money-2', name: 'Comisiones', state: '/comisiones', type: 'link' },

            ]
        },
        {
            name: 'Configuraciones',
            description: 'Gestión de Configuraciones ',
            type: 'dropDown',
            icon: 'i-Gear',
            sub: [
                { icon: 'i-Key', name: 'Roles', state: '/roles', type: 'link' },
                { icon: 'i-Conference', name: 'Usuarios', state: '/users', type: 'link' },
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
