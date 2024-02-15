import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';


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
  reason_anulate: string;
}

@Component({
  selector: "app-providers-detail",
  templateUrl: "./provider-detail.component.html",
  styleUrls: ["./provider-detail.component.scss"],
})
export class ProvidersDetailComponent implements OnInit {
  loading: boolean;
  formBasic: FormGroup;
  viewMode: "new" | "edit" | "print" = "new";
  id: string;
  isNew: boolean;
  provider: Provider = {
    name_provider: "",
    state_provider: "Activo",
    nit_cedula: "",
    email_provider: "",
    address_provider: "",
    phone_provider: "",
    observation_provider: "",
    name_contact: "",
    creation_date_provider: new Date(),
    reason_anulate: "",
  };
  new_provider = {
    name_provider: "",
    state_provider: "Activo",
    nit_cedula: "",
    email_provider: "",
    address_provider: "",
    phone_provider: "",
    observation_provider: "",
    name_contact: "",
    creation_date_provider: new Date(),
    reason_anulate: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _providersService: ProvidersService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this._authService.validateUserPermissions("Proveedores");
    this.id = this.route.snapshot.params["id"];
    this.isNew = !this.id;
    this.buildProvidersForm(this.provider);
    console.log('Formulario construido:', this.formBasic); // Agrega esta línea
    this.setViewMode();
    this.getProvider();
    if (!this.isNew) {
      this.getProvider();
    }
    this.formBasic.get('nit_cedula').setAsyncValidators(this.checkCedulaAvailability.bind(this));
  }
  checkCedulaAvailability(control: AbstractControl): Observable<{ [key: string]: any } | null> {
    const cedula = control.value;

    // Si el valor es el mismo que la cédula actual, no se realiza la verificación
    if (this.provider && cedula === this.provider.nit_cedula) {
      return of(null);
    }

    // Realiza la verificación llamando al servicio
    return this._providersService.checkCedulaAvailability(cedula).pipe(
      map(isAvailable => (isAvailable ? null : { cedulaNotAvailable: true }))
    );
  }
  updatedFields: any = {};

  buildProvidersForm(i: any = {}) {
    console.log("formulario: ", i)
    this.formBasic = this.formBuilder.group({
      name_provider: [i.name_provider, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      nit_cedula: [i.nit_cedula, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ]],
      email_provider: [i.email_provider, [
        Validators.required,
        Validators.email,
        Validators.maxLength(80)
    ]],
      address_provider: [i.address_provider, [
        Validators.required,
        Validators.maxLength(80)
      ]],
      phone_provider: [i.phone_provider, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(7),
        Validators.pattern(/^[0-9\s]+$/)
      ]],
      reason_anulate:[i.reason_anulate],

      state_provider: [i.state_provider],
      observation_provider: [i.observation_provider],
      name_contact: [i.name_contact, [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$'), // Permite solo letras y espacios
        Validators.minLength(3),
        Validators.maxLength(50)
    ]],
      creation_date_provider: [i.creation_date_provider],
    });
    console.log("Razon anulate", i.reason_anulate, "nombre", i.name_provider)

  }
  setViewMode() {
    const currentRoute = this.router.url;

    if (currentRoute.includes("/registrar")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/editar/")) {
      this.viewMode = "edit";
    } else if (currentRoute.includes("/detalle/")) {
      this.viewMode = "print";
    }
    console.log("viewMode:", this.viewMode);
  }
  getProvider() {
    console.log("Proveedor antes de cargar datos: ",this.provider)
    if (this.viewMode == "print" || this.viewMode == "edit") {
      this.id = this.route.snapshot.params["id_provider"];
      console.log(this.id);

      const providerId = parseInt(this.id, 10); // Convierte this.id a un número

      this._providersService.getProviderById(providerId).subscribe(
        (data) => {
          console.log("Datos del proveedor", data);
          this.provider = data;
          console.log(this.provider);
        },
        (error) => {
          console.error("Error al obtener proveedor:", error);
        }
      );
    }else if(this.viewMode === "new"){
      
    }
  }
  handleStateSelection(event: any) {
    this.new_provider.state_provider = event.target.value;
  }
  handleNameProviderSelection(event: any) {
    this.new_provider.name_provider = event.target.value;
    this.updatedFields.name_provider = event.target.value;
  }
  handleNameContactSelection(event: any) {
    this.new_provider.name_contact = event.target.value;
    this.updatedFields.name_contact = event.target.value;
  }
  handleNitSelection(event: any) {
    this.new_provider.nit_cedula = event.target.value;
    this.updatedFields.nit_cedula = event.target.value;
    console.log(this.updatedFields.name_contact)
  }
  handleMailSelection(event: any) {
    this.new_provider.email_provider = event.target.value;
    this.updatedFields.email_provider = event.target.value;
  }
  handleAddressSelection(event: any) {
    this.new_provider.address_provider = event.target.value;
    this.updatedFields.address_provider = event.target.value;
    console.log('Address Value:', event.target.value);
  }
  handleObservationSelection(event: any) {
    this.new_provider.observation_provider = event.target.value;
    this.updatedFields.observation_provider = event.target.value;
  }
  handlePhoneSelection(event: any) {
    this.new_provider.phone_provider = event.target.value;
    this.updatedFields.phone_provider = event.target.value;
  }

  createProvider() {
    const currentRoute = this.router.url;
    console.log(currentRoute);
  
    if (currentRoute.includes('/registrar')) {
      console.log(this.new_provider);
  
      this._providersService.createProvider(this.new_provider).subscribe(
        (data) => {
          console.log(data);
          this.loading = true;
          this.loading = false;
          this.toastr.success('Proveedor creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
          this.router.navigate(['/proveedores'])
        },
        (error) => {
          this.loading = false;
          let backendErrorMessage: string;
        
          if (error.error && error.error.error) {
            backendErrorMessage = error.error.error; // Access error message like this if it's available at error.error.error
          } else {
            backendErrorMessage = error.message || error.toString(); // Otherwise, access it like this
          }
        
          this.toastr.error(backendErrorMessage, 'Error', { progressBar: true });
          console.error("Error al crear el proveedor:", error);
        }
      );
    }
    this.loading = true;
  }

  updateProvider() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/editar')) {
      this._providersService.updateProvider(this.id, this.updatedFields).subscribe(
        (data) => {
          console.log(data);
          this.loading = true;
          this.loading = false;
          this.toastr.success('Proveedor actualizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
          this.router.navigate(['/proveedores']);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Ya existe un proveedor con estos datos.', 'Error', { progressBar: true });
          console.error('Error al actualizar el proveedor:', error);
        }
      );
    }
  }

  submit() {
    if (this.viewMode === "new") {
      this.createProvider(); // Lógica de creación
    } else if (this.viewMode === "edit") {
      this.updateProvider(); // Lógica de edición
    }
  }
}
