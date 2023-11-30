import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedAnimations } from "src/app/shared/animations/shared-animations";


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations],
})
export class ForgotComponent implements OnInit {
  @ViewChild('resetForm', { static: false }) resetForm: NgForm;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  resetPassword(): void {
    // Obtén el valor del campo de correo electrónico desde el modelo
    const email = this.resetForm.value.email;

    // Llama al servicio para enviar la solicitud de recuperación de contraseña
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        console.log('Recuperación de contraseña exitosa:', response);
        // Puedes manejar la respuesta del servidor según tus necesidades
      },
      (error) => {
        console.error('Error al recuperar la contraseña:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }
}
