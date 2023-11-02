import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { set } from 'date-fns';

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
  new_provider = {
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
    private _providersService: ProvidersService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildProvidersForm(this.provider);
    this.setViewMode();
    this.getProvider();
  }



  buildProvidersForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      id: [i.id_provider],
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

    if (currentRoute.includes('/registrar')) {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/editar/')) {
      this.viewMode = 'edit';

    } else if (currentRoute.includes('/detalle/')) {
      this.viewMode = 'print';
    }
    console.log('viewMode:', this.viewMode);
  }
  getProvider() {
    this.id = this.route.snapshot.params['id_provider'];
    console.log(this.id);

    const providerId = parseInt(this.id, 10); // Convierte this.id a un número

    if (isNaN(providerId)) {
      console.error('ID no válido');
      return;
    }

    this._providersService.getProviderById(providerId).subscribe(
      (data) => {
        this.provider = data;
        console.log(this.provider);
      },
      (error) => {
        console.error('Error al obtener proveedor:', error);
      }
    );
  }
  handleStateSelection(event: any) {
    this.new_provider.state_provider = event.target.value;
  }
  handleNameProviderSelection(event: any) {
    this.new_provider.name_provider = event.target.value;
  }
  handleNameContactSelection(event: any) {
    this.new_provider.name_contact = event.target.value;
  }
  handleNitSelection(event: any) {
    this.new_provider.nit_cedula = event.target.value;
  }
  handleMailSelection(event: any) {
    this.new_provider.email_provider = event.target.value;
  }
  handleAddressSelection(event: any) {
    this.new_provider.address_provider = event.target.value;
  }
  handleObservationSelection(event: any) {
    this.new_provider.observation_provider = event.target.value;
  }
  handlePhoneSelection(event: any) {
    this.new_provider.phone_provider = event.target.value;
  }
  

  submit() {
    const currentRoute = this.router.url;

  
    if (currentRoute.includes('/registrar')) {
      console.log(this.new_provider);
      this.loading = true; 
      setTimeout(() =>{ 
      this._providersService.createProvider(this.new_provider).subscribe(
        (data) => {
          this.loading = false;
          this.toastr.success('Proveedor creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
          console.log(data);
          setTimeout(() => {
            this.router.navigateByUrl('/proveedores');
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Fallo al crear el proveedor.', 'Error', { progressBar: true });
          console.error('Error al crear el proveedor:', error);
        }
      );
    }, 3000);
    }
  }
  toggleProviderState(provider: Provider) {
    // Cambiar el estado del proveedor
    if (provider.state_provider === 'Activo') {
      provider.state_provider = 'Inactivo';
    } else {
      provider.state_provider = 'Activo';
    }
  }
}
