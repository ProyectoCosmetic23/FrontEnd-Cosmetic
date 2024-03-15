import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { SharedAnimations } from "src/app/shared/animations/shared-animations";
import { AuthService } from "../../../shared/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: [SharedAnimations],
})
export class SigninComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loading: boolean;
  loadingText: string;

  // Propiedad para mostrar/ocultar la contraseña
  showPassword: boolean = false;

  constructor(private toastr: ToastrService) {}

  public myForm: FormGroup = this.fb.group({
    email: ["marcela18@gmai.com", [Validators.required, Validators.email]],
    password: ["M1234567*", [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "Loading Dashboard Module...";
        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    // Inicializa el formulario de inicio de sesión con validaciones
    this.myForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email, this.allowedDomainsValidator(['gmail.com', 'hotmail.com', 'outlook.com'])]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  // Función de validación para dominios permitidos
  allowedDomainsValidator(allowedDomains: string[]) {
    return (control: FormControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const domain: string = email.substring(email.lastIndexOf('@') + 1);
      if (!allowedDomains.includes(domain.toLowerCase())) {
        return { 'invalidDomain': true };
      }
      return null;
    };
  }

  // Toggle para mostrar/ocultar la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        if (!response) {
          return; // No hacer nada si no hay respuesta
        }
  
        if (response.error) {
          // Manejar errores específicos
          this.toastr.error(response.error, "Error de validación", {
            progressBar: true,
            timeOut: 3000,
          });
          return;
        }
  
        if (response.successMessage) {
          // Mostrar mensaje de inicio de sesión exitoso
          this.toastr.success(response.successMessage, "¡Inicio de sesión exitoso!", {
            progressBar: true,
            timeOut: 3000,
          });
          this.router.navigateByUrl("/dashboard/v1");
          return;
        }
  
        // Si no hay errores, continuar con el proceso de inicio de sesión
        if (response.user && response.token) {
          this.router.navigateByUrl("/dashboard/v1");
        }
      },
      error: (errorMessage: any) => {
        // Comenta o elimina la línea que imprime el mensaje de error en la consola
        // console.error("Error del servidor:", errorMessage);
        this.toastr.error(errorMessage, "Error de validación", {
          progressBar: true,
          timeOut: 3000,
        });
      },
    });
  }
}  