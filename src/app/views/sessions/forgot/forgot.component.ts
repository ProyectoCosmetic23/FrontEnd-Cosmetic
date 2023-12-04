import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: [SharedAnimations],
})
export class ForgotComponent implements OnInit {
  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.allowedDomainsValidator(['gmail.com', 'hotmail.com', 'outlook.com'])]],
    });
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;

      this.authService.forgotPassword(email).subscribe(
        (response) => {
          this.toastr.success('Link de recuperación enviado satisfactoriamente', 'Éxito', {
            progressBar: true,
            timeOut: 3000,
          });
          this.router.navigate(['/sessions/signin']);
        },
        (error) => {
          this.toastr.error('El Correo ingresado no es válido', 'Error', {
            progressBar: true,
            timeOut: 3000,
          });
        }
      );
    } else {
      this.toastr.error('Por favor, ingresa un correo electrónico válido', 'Error', {
        progressBar: true,
        timeOut: 3000,
      });
    }
  }

  allowedDomainsValidator(allowedDomains: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const domain: string = email.substring(email.lastIndexOf('@') + 1);
      if (!allowedDomains.includes(domain.toLowerCase())) {
        return { 'invalidDomain': true };
      }
      return null;
    };
  }
}
