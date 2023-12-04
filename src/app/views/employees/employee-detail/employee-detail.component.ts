import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EmployeesService } from 'src/app/shared/services/employee.service';
import { EmployeeFormModel } from '../models/employee.model';
import { CookieService } from 'ngx-cookie-service';



@Component({
    selector: 'app-empleado-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

    
    loading: boolean = false;
    formBasic: FormGroup;
    viewMode: 'new' | 'edit' | 'print' = 'new';
    id: string;
    isNew: boolean;
    invoice: any = {};
    invoiceForm: UntypedFormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    employeeData: EmployeeFormModel;
    employeeForm: FormGroup;
    employeeFormSub: Subscription;

    constructor(
        
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        private cookieService: CookieService,
        private employeesService: EmployeesService
    ) {

    }


    ngOnInit() {
        
        this.id = this.route.snapshot.params['id_employee'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
        
    }

    private inicializateForm(id: number): void {
        this.employeeForm = this.formBuilder.group({
            id_card_employee: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
            name_employee: ['', [Validators.required, Validators.maxLength(80)],[this.validateNameSimbolAndNumber]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
            address: ['', [Validators.required, Validators.maxLength(80)]],
            phone: ['', [Validators.required, Validators.maxLength(80), Validators.pattern('^[0-9]{10}$')]],
            observation: ['',[ Validators.maxLength(100)]],
            state_employee: [],
            creation_date_employee: [],
            reason_anulate:['']
        });

        if (this.viewMode == 'print') {
            this.employeeForm.disable();
            
        }

        if (this.viewMode == 'edit') {
            this.cedula.disable();
        }

        if (this.viewMode != 'new') {
            const token = this.cookieService.get('token');
            this.getEmployeeByID(id, token);
        }

    }
    private getEmployeeByID(id: number, token?: string): void {
        console.log('Token:', token); // Agrega este log para verificar el token
        this.loading = true;
        this.employeesService.getEmployeesById(id, token).subscribe({
            next: (response: any) => {
                this.employeeData = new EmployeeFormModel(response);
                this.setDataEmployee();
            },
            error: (err) => {
                console.log('err', err);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            },
        });
    }
    

    private setDataEmployee(): void {
        if (this.employeeData) {
            this.cedula.setValue(this.employeeData.id_card_employee)
            this.employeeForm.setValue(this.employeeData)
        }
    }

    createEmployee() {
        if (this.employeeForm.valid) {
            
            const employeeData = this.employeeForm.value;
            const token = this.cookieService.get('token');
            this.loading = true;
            this.employeesService.createEmployee(employeeData,token).subscribe(
                (response) => {
                    this.loading = false;
                    console.log("Éxito al crear empleado: ", response);
                    this.submit();
                },
                (error) => {
                    this.loading = false;
                    console.error("Error al crear empleado: ", this.toastr.error);
                    const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el empleado.';
                    this.toastr.error(errorMessage, 'Error');
                }
            );
        } else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
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
        if (this.email && this.email instanceof AbstractControl) {
            this.validateEmail(this.email).then((result) => {
                if (result) {
                    this.email.setErrors(result);
                }
            });
        }
    }

    validateEmail(control: AbstractControl) {
        const email = control.value.toLowerCase();
        const validDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        const domain = email.split('@')[1];

        if (!email) {
            return Promise.resolve(null); // Correo vacío es válido
        }

        if (validDomains.includes(domain)) {
            return new Promise((resolve) => {
                if (!control.value) {
                    resolve(null);
                } else {
                    this.employeesService.checkEmailAvailability(control.value).subscribe(
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
                this.employeesService.checkCedulaAvailability(control.value).subscribe(
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
    saveEmployeeChanges(id: number, updatedData: any) {
        const token = this.cookieService.get('token');
        this.employeesService.updateEmployee(id, updatedData, token).subscribe(
            (response) => {
                this.loading = false;
                this.submit();
            },
            (error) => {
                this.loading = false;
                console.error("Error al actualizar empleado: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al actualizar el empleado.';
                this.toastr.error(errorMessage, 'Error');
            }
        );
    }
    


    
    

    public submitEmployee(): void {
        if (this.viewMode == 'new') {
            this.createEmployee();
        } else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }


    saveChanges() {
        console.log('editar')

        if (this.employeeForm.valid) {
          const id = Number(this.id); 
          const updatedData = {
            id_card_employee: this.cedula.value,
            name_employee: this.employeeForm.get('name_employee').value,
            email: this.email.value,
            address: this.employeeForm.get('address').value,
            phone: this.employeeForm.get('phone').value,
            observation: this.employeeForm.get('observation').value,
          };
          this.saveEmployeeChanges(id, updatedData);
        }else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
      }
      
        

    cancel() {

        this.router.navigateByUrl('/employees');
    }

    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Empleado Modificado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/employees');
                },);
            }, );
        }
    }





    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new';
        } else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit';
        } else if (currentRoute.includes('/print/')) {
            this.viewMode = 'print';
        }
    }



    print() {
        if (window) {
            window.print();
        }
    }


    get email() {
        return this.employeeForm.get('email');
    }

    get cedula() {
        return this.employeeForm.get('id_card_employee');
    }

}
