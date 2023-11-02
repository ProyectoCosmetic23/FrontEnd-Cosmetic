import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { Utils } from 'src/app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { EmployeesService } from 'src/app/shared/services/employee.service';

@Component({
    selector: 'app-empleado-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
    
    employeeForm: FormGroup;
    loading: boolean=false;
    formBasic: FormGroup;
    viewMode: 'edit' | 'print' = 'edit';
    id: string;
    isNew: boolean;
    invoice: any = {};
    invoiceForm: UntypedFormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private dl: DataLayerService,
        private toastr: ToastrService,
        private employeesService: EmployeesService
        ) {
            this.employeeForm = this.formBuilder.group({
                id_card_employee: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(7),Validators.pattern('^[0-9]+$')],[this.validateCedulaAvailability.bind(this)]],
                name_employee: ['',[Validators.required,Validators.maxLength(80)],[this.validateNameSimbol]],
                email: ['',[Validators.required, Validators.email, Validators.maxLength(80)],[this.validateEmail.bind(this)]],
                address: ['', [Validators.required, Validators.maxLength(80)]],
                phone: ['',[Validators.required, Validators.maxLength(80), Validators.pattern('^[0-9]{10}$')]],
                observation: ['', [Validators.required, Validators.maxLength(100)]],
                    });
        }


        validateNameSimbol(control: FormControl) {
            const value = control.value;
  const pattern = '^[a-zA-ZáéíóúñÑ ]+(?:\\s[´a-zA-ZáéíóúñÑ ]+)*$';

  return new Promise((resolve) => {
    setTimeout(() => {
      const match = value.match(pattern);
      if (match) {
        resolve(null); // Válido
      } else {
        resolve({ invalidName2: true }); // No válido
      }
    }, 1000); // Simula una operación asincrónica
  });
          }
          

        validateNameWithNumber(control: FormControl) {
            const value = control.value;
            const pattern = /[0-9]/g;
            const match = value.match(pattern);
            if (match && match.length > 1) {
                return { invalidName: true };
            }
        
            return null;
        }


        validateEmail(control: FormControl) {
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
        
            validateCedulaAvailability(control: FormControl) {
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
        

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildInvoiceForm(this.invoice);
        if (this.id) {
            this.viewMode = 'print';
            this.dl.getInvoice(this.id)
                .subscribe(res => {
                    this.invoice = res;
                    this.buildInvoiceForm(this.invoice);
                    this.subTotal = this.calculateSubtotal(this.invoiceForm.value);
                })
        }
    }employeeData

    createEmployee() {
        if (this.employeeForm.valid) {
            const employeeData = this.employeeForm.value;
            this.loading = true;
            this.employeesService.createEmployee(employeeData).subscribe(
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

        cancel() {

            this.router.navigateByUrl('/employees');
    }
        
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Empleado registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/employees');
                }, 3000);
            }, 3000);
        }
    }
    
    
    buildInvoiceForm(i: any = {}) {
        this.invoiceForm = this.fb.group({
            id: [i.id],
            orderNumber: [i.orderNumber],
            orderStatus: [i.orderStatus],
            currency: [i.currency],
            vat: [i.vat],
            orderDate: [i.orderDate ? Utils.dateToNgbDate(i.orderDate) : {}],
            billFrom: this.fb.group({
                name: [i.billFrom ? i.billFrom.name : ''],
                address: [i.billFrom ? i.billFrom.address : '']
            }),
            billTo: this.fb.group({
                name: [i.billTo ? i.billTo.name : ''],
                address: [i.billTo ? i.billTo.address : '']
            }),
            items: this.fb.array((() => {
                if (!i.items) {
                    return [];
                }
                return i.items.map((item) => this.createItem(item));
            })())
        });
        // LINSTEN FOR VALUE CHANGES AND CALCULATE TOTAL
        if (this.invoiceFormSub) {
            this.invoiceFormSub.unsubscribe();
        }
        this.invoiceFormSub = this.invoiceForm.valueChanges
            .subscribe(formValue => {
                this.subTotal = this.calculateSubtotal(formValue);
            });
    }

    createItem(item: any = {}) {
        return this.fb.group({
            name: [item.name],
            unit: [item.unit],
            unitPrice: [item.unitPrice]
        });
    }
    addItem() {
        const control = <UntypedFormArray>this.invoiceForm.controls['items'];
        control.push(this.createItem());
    }
    removeItem(i) {
        const control = <UntypedFormArray>this.invoiceForm.controls['items'];
        control.removeAt(i);
    }



    calculateSubtotal(invoice) {
        let total = 0;
        invoice.items.forEach(i => {
            total += (i.unit * i.unitPrice);
        });
        return total;
    }

    print() {
        if (window) {
            window.print();
        }
    }

}
