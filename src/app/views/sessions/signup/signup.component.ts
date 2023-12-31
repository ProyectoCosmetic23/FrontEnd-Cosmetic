import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations],
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  showPassword: boolean = false;
  token: string;
  
  // Propiedades para el formulario
  public myForm: FormGroup;

  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    // Inicializa el formulario de cambio de contraseña con validaciones
    this.myForm = this.fb.group({
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required]),
    }, {
      validators: this.passwordsMatchValidator,
    });
  }

  // Validador personalizado para comprobar que las contraseñas coincidan
  private passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;

    return newPassword === confirmPassword ? null : { 'passwordsNotMatch': true };
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  changePassword() {
    if (this.myForm.valid) {
      const newPassword = this.myForm.get('newPassword').value;
      this.authService.changePassword(this.token, newPassword).subscribe(
        (response) => {
          this.toastr.success('Contraseña cambiada exitosamente', 'Éxito', {
            progressBar: true,
            timeOut: 3000,
          });
  
          // Aquí puedes manejar la redirección dentro del mismo componente
          this.router.navigate(['/sessions/signin']);
          
          // Si prefieres no navegar y quieres mantener al usuario en el mismo componente,
          // puedes mostrar un mensaje o realizar alguna acción específica.
        },
        (error) => {
          console.error('Error al cambiar la contraseña:', error);
          this.toastr.error('Error al cambiar la contraseña', 'Error', {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
    } else {
      this.toastr.error('Por favor, completa todos los campos obligatorios correctamente', 'Error', {
        progressBar: true,
        timeOut: 3000,
      });
    }
  }
}  
