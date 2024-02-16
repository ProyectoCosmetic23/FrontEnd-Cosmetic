import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ClientsService } from "src/app/shared/services/client.service";
import { ClientFormModel } from "../models/client.model";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-cliente-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
})
export class ClientDetailComponent implements OnInit {
  loading: boolean = false;
  formBasic: FormGroup;
  viewMode: "new" | "edit" | "print" = "new";
  id: string;
  isNew: boolean;
  invoice: any = {};
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  subTotal: number;
  saving: boolean;
  clientData: ClientFormModel;
  clientForm: FormGroup;
  clientFormSub: Subscription;
  showLoadingScreen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private clientsService: ClientsService,
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    this._authService.validateUserPermissions("Clientes");
    this.id = this.route.snapshot.params["id_client"];
    this.isNew = !this.id;
    this.setViewMode();
    this.inicializateForm(Number(this.id));
  }

  private inicializateForm(id: number): void {
    this.clientForm = this.formBuilder.group({
      nit_or_id_client: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(7),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      name_client: [
        "",
        [Validators.required, Validators.maxLength(80)],
        [this.validateNameSimbolAndNumber],
      ],
      last_name_client: [
        "",
        [Validators.required, Validators.maxLength(80)],
        [this.validateNameSimbolAndNumber],
      ],
      email_client: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(80)],
      ],
      address_client: ["", [Validators.required, Validators.maxLength(80)]],
      phone_client: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.pattern("^[0-9]{10}$"),
        ],
      ],
      state_client: [],
      reason_anulate: [""],
    });

    if (this.viewMode == "print") {
      this.clientForm.disable();
    }

    if (this.viewMode == "edit") {
      this.cedula.disable();
    }

    if (this.viewMode != "new") {
      this.getClientByID(id);
    }
  }

  private getClientByID(id: number): void {
    this.showLoadingScreen = true;
    this.loading = true;
    this.clientsService.getClientsById(id).subscribe({
      next: (response: any) => {
        this.clientData = new ClientFormModel(response);
        this.setDataClient();
      },
      error: (err) => {
        console.log("err", err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.showLoadingScreen = false;
      },
    });
  }

  // private setDataClient(): void {
  //     if (this.clientData) {
  //         this.clientForm.setValue(this.clientData)
  //         console.log(this.clientForm)
  //     }
  // }

  private setDataClient(): void {
    if (this.clientData) {
      this.cedula.setValue(this.clientData.nit_or_id_client);
      this.clientForm.setValue(this.clientData);
    }
  }

  createClient() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      this.loading = true;
      this.clientsService.createClient(clientData).subscribe(
        (response) => {
          this.loading = false;
          console.log("Éxito al crear cliente: ", response);
          this.submit();
        },
        (error) => {
          this.loading = false;
          console.error("Error al crear cliente: ", this.toastr.error);
          const errorMessage = error.error
            ? error.error
            : "Ocurrió un error al crear el cliente.";
          this.toastr.error(errorMessage, "Error");
        }
      );
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  validateNameSimbolAndNumber(control: FormControl) {
    const nameValue = control.value;
    const combinedPattern = /^[\wáéíóúñÑ´\s]+$/;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (combinedPattern.test(nameValue)) {
          const numberCount = (nameValue.match(/\d/g) || []).length;
          if (numberCount <= 1) {
            resolve(null); // Válido
          } else {
            resolve({ invalidName: true }); // No válido
          }
        } else {
          resolve({ invalidName: true }); // No válido
        }
      }, 0);
    });
  }

  public checkEmailAvailability(): void {
    if (this.email_client && this.email_client instanceof AbstractControl) {
      this.validateEmail(this.email_client).then((result) => {
        if (result) {
          this.email_client.setErrors(result);
        }
      });
    }
  }

  validateEmail(control: AbstractControl) {
    const email = control.value.toLowerCase();
    const validDomains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
      "yahoo.com",
    ];
    const domain = email.split("@")[1];

    if (!email) {
      return Promise.resolve(null); // Correo vacío es válido
    }

    if (validDomains.includes(domain)) {
      return new Promise((resolve) => {
        if (!control.value) {
          resolve(null);
        } else {
          this.clientsService.checkEmailAvailability(control.value).subscribe(
            (isAvailable) => {
              if (isAvailable) {
                resolve(null); // El correo es válido y está disponible
              } else {
                resolve({ emailTaken: true }); // El correo no está disponible
              }
            },
            (error) => {
              resolve({ emailTaken: true });
            }
          );
        }
      });
    } else {
      return Promise.resolve({ invalidDomain: true }); // No es un correo válido en el dominio permitido
    }
  }

  public checkCedulaAvailability(): void {
    if (this.cedula && this.cedula instanceof AbstractControl) {
      this.validateCedulaAvailability(this.cedula).then((result) => {
        if (result) {
          this.cedula.setErrors(result);
        }
      });
    }
  }

  validateCedulaAvailability(control: AbstractControl) {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve(null);
      } else {
        this.clientsService.checkCedulaAvailability(control.value).subscribe(
          (isAvailable) => {
            if (isAvailable) {
              resolve(null);
            } else {
              resolve({ cedulaTaken: true });
            }
          },
          (error) => {
            resolve({ cedulaTaken: true });
          }
        );
      }
    });
  }

  //Guardar cambios al editar

  saveClientsChanges(id: number, updatedData: any) {
    this.clientsService.updateClient(id, updatedData).subscribe(
      (response) => {
        this.loading = false;
        this.submit();
      },
      (error) => {
        this.loading = false;
        console.error("Error al crear cliente: ", this.toastr.error);
        const errorMessage = error.error
          ? error.error
          : "Ocurrió un error al crear el cliente.";
        this.toastr.error(errorMessage, "Error");
      }
    );
  }

  public submitClient(): void {
    if (this.viewMode == "new") {
      this.createClient();
    } else if (this.viewMode == "edit") {
      this.saveChanges();
    }
  }

  //Guardar el crear cliente
  saveChanges() {
    console.log("editar");
    if (this.clientForm.valid) {
      const id = Number(this.id); // Convierte el ID a número
      const updatedData = {
        nit_or_id_client: this.cedula.value,
        name_client: this.clientForm.get("name_client").value,
        email_client: this.email_client.value,
        address_client: this.clientForm.get("address_client").value,
        phone_client: this.clientForm.get("phone_client").value,
      };
      this.saveClientsChanges(id, updatedData);
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl("/clients");
  }

  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success("Cliente registrado con éxito.", "Éxito", {
          progressBar: true,
          timeOut: 3000,
        });
        setTimeout(() => {
          this.router.navigateByUrl("/clients");
        });
      });
    }
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/edit/")) {
      this.viewMode = "edit";
    } else if (currentRoute.includes("/print/")) {
      this.showLoadingScreen = true;
      this.viewMode = "print";
    }
  }

  print() {
    if (window) {
      window.print();
    }
  }

  get cedula() {
    return this.clientForm.get("nit_or_id_client");
  }

  get nombre() {
    return this.clientForm.get("name_client");
  }

  get email_client() {
    return this.clientForm.get("email_client");
  }

  get last_name_client() {
    return this.clientForm.get("last_name_client");
  }

  get phone_client() {
    return this.clientForm.get("phone_client");
  }

  get address_client() {
    return this.clientForm.get("address_client");
  }

  get state_client() {
    return this.clientForm.get("state_client");
  }
}
