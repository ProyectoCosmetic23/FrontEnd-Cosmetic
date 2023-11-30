import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Asegúrate de importar Router desde '@angular/router'
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations],
})
export class ForgotComponent implements OnInit {
  @ViewChild('resetForm', { static: false }) resetForm: NgForm;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {}

  resetPassword(): void {
    // Obtén el valor del campo de correo electrónico desde el modelo
    const email = this.resetForm.value.email;

    // Llama al servicio para enviar la solicitud de recuperación de contraseña
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        this.toastr.success('Link de recuperación enviado satisfactoriamente', 'Éxito', {
          progressBar: true,
          timeOut: 3000,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('El Correo ingresado no es válido', 'Error', {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }
}
