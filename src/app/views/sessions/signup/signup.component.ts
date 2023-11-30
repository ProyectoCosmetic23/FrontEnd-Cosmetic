import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  token: string;
  newPassword: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      // Puedes realizar acciones adicionales con el token si es necesario
    });
  }

  changePassword() {
    this.authService.changePassword(this.token, this.newPassword).subscribe(
      (response) => {
        // Redirige al usuario a la página de inicio de sesión u otra después de cambiar la contraseña
        this.router.navigate(['/login']);
      },
      (error) => {
        // Maneja errores aquí, como mostrar un mensaje al usuario
        console.error('Error al cambiar la contraseña:', error);
      }
    );
  }
}
