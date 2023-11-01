import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/shared/services/roles.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';

interface Role {
    name_role: string;
    state_role: string;
    modules_role: string[];
}
@Component({
    selector: 'app-roles-detail',
    templateUrl: './roles-detail.component.html',
    styleUrls: ['./roles-detail.component.scss']
})
export class RolesDetailComponent implements OnInit {
    loading: boolean;
    formBasic: FormGroup;
    viewMode: 'new' | 'edit' | 'print' = 'new';
    id: string;
    isNew: boolean;
    roles: any = {};
    rolesForm: UntypedFormGroup;
    rolesFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    role: Role = {
        name_role: '',
        state_role: 'Activo',
        modules_role: []
    };
    selected_modules = [];
    new_role = {
        name_role: '',
        state_role: 'Activo',
        modules_role: []
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _rolesService: RolesService,
        private toastr: ToastrService,
    ) {
        this.formBasic = this.formBuilder.group({

        });
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildRolesForm(this.roles);
        this.setViewMode();
        this.getRole();
    }
    buildRolesForm(i: any = {}) {
        this.rolesForm = this.fb.group({
            id: [i.id],
            nombreRol: [i.nombre_rol],
            modulosRol: [i.nombre_rol]
        })
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new';
        } else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit';
        } else if (currentRoute.includes('/detail/')) {
            this.viewMode = 'print';
        }
    }
    getRole() {
        this.id = this.route.snapshot.params['id_role'];
        console.log(this.id);
        this._rolesService.getRoleById(this.id).subscribe(
            (data) => {
                this.role = data;
                console.log(this.role);
            },
            (error) => {
                console.error('Error al obtener rol:', error);
            }
        );
    }
    handleModuleSelection(module: string) {
        if (this.selected_modules.includes(module)) {
            this.selected_modules = this.selected_modules.filter((item) => item !== module);
        } else {
            this.selected_modules.push(module);
        }
    }
    handleNameSelection(event: any) {
        this.new_role.name_role = event.target.value;
    }
    createRole() {
        const currentRoute = this.router.url;
        this.new_role.modules_role = this.selected_modules;
        console.log(currentRoute);
        if (currentRoute.includes('/new')) {
            console.log(this.new_role);
            this._rolesService.createRole(this.new_role).subscribe(
                (data) => {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.toastr.success('Rol creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                        setTimeout(() => {
                            this.router.navigate(['/roles']);
                        }, 3000);
                    }, 3000);
                },
                (error) => {
                    this.loading = false;
                    this.toastr.error('Fallo al crear el rol.', 'Error', { progressBar: true });
                    console.error('Error al crear el rol:', error);
                }
            );
        }
        this.loading = true;
    }
}
