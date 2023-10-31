import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface Provider {
  name_provider: string;
  nit_cedula: string;
  email_provider: string;
  address_provider: string;
  phone_provider: string;
  state_provider: string;
  observation_provider: string;
  name_contact: string;
  creation_date_provider: Date;
}

@Component({
  selector: 'app-providers-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss']
})
export class ProvidersDetailComponent implements OnInit {
  loading: boolean;
  formBasic: FormGroup;
  viewMode: 'new' | 'edit' | 'print' = 'new';
  id: string;
  isNew: boolean;
  provider: Provider = {
    name_provider: '',
    state_provider: 'Activo',
    nit_cedula: '',
    email_provider: '',
    address_provider: '',
    phone_provider: '',
    observation_provider: '',
    name_contact: '',
    creation_date_provider: new Date(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _providersService: ProvidersService, // Cambio de _rolesService a _providersService
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildProvidersForm(this.provider); // Cambio de buildRolesForm a buildProvidersForm
    this.setViewMode();
    this.getProvider(); // Cambio de getRole a getProvider
  }

  buildProvidersForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      // Aquí debes definir tus campos del formulario
      name_provider: [i.name_provider],
      nit_cedula: [i.nit_cedula],
      email_provider: [i.email_provider],
      address_provider: [i.address_provider],
      phone_provider: [i.phone_provider],
      state_provider: [i.state_provider],
      observation_provider: [i.observation_provider],
      name_contact: [i.name_contact],
      creation_date_provider: [i.creation_date_provider],
    });
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute === '/new') {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/edit/')) {
      this.viewMode = 'edit';
    } else if (currentRoute.includes('/detail/')) {
      this.viewMode = 'print';
    }
  }

  getProvider() {
    this.id = this.route.snapshot.params['id_provider'];
    console.log(this.id);
    this._providersService.getProviderById(this.id).subscribe(
      (data) => {
        this.provider = data;
        console.log(this.provider);
      },
      (error) => {
        console.error('Error al obtener proveedor:', error);
      }
    );
  }

  submit() {
    const currentRoute = this.router.url;
    console.log(currentRoute);

    if (currentRoute.includes('/new')) {
      // Si estás creando un nuevo proveedor
      console.log(this.provider);
      this._providersService.createProvider(this.provider).subscribe(
        (data) => {
          this.loading = false;
          this.toastr.success('Proveedor creado con éxito.', 'Proceso Completado', { progressBar: true });
          console.log(data);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Fallo al crear el proveedor.', 'Error', { progressBar: true });
          console.error('Error al crear el proveedor:', error);
        }
      );
    }

    this.loading = true;
  }
}
