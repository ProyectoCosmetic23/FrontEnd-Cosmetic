import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;

  
    constructor(private toastr: ToastrService) { }
    public myForm: FormGroup = this.fb.group({
        email: ['marcela18@gmai.com', [Validators.required, Validators.email]],
        password: ['M1234567*', [Validators.required, Validators.minLength(6)]],
    });

    ngOnInit() {
        this.authService.logout();
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';
                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });
    }

    login() {
        const { email, password } = this.myForm.value;
        this.authService.login(email, password).subscribe({
            next: () => this.router.navigateByUrl('/dashboard/v1'),
            error: (errorMessage) => {
                console.error('Error del servidor:', errorMessage);
                this.toastr.error(errorMessage, 'Error de validación', { progressBar: true, timeOut: 3000 });
            },
        });
    }

    


}
