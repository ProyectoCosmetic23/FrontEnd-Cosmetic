import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar ToastrService desde tu librería Toastr
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations],
})
export class SignupComponent {
  token: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
      // Puedes realizar acciones adicionales con el token si es necesario
    });
  }

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log(this.newPassword);
      console.log(this.token);
      this.authService.changePassword(this.token, this.newPassword).subscribe(
        (response) => {
          // Redirige al usuario a la página de inicio de sesión u otra después de cambiar la contraseña
          this.router.navigate(['/login']);
          this.toastr.success('Contraseña cambiada exitosamente', 'Éxito', {
            progressBar: true,
            timeOut: 3000,
          });
        },
        (error) => {
          // Imprime el error completo en la consola
          console.error('Error al cambiar la contraseña:', error);
          this.toastr.error('Error al cambiar la contraseña', 'Error', {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
    } else {
      // Muestra un mensaje de error al usuario indicando que las contraseñas no coinciden
      console.error('Las contraseñas no coinciden');
      this.toastr.error('Las contraseñas no coinciden', 'Error', {
        progressBar: true,
        timeOut: 3000,
      });
    }
  }
}
