import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,UntypedFormGroup, UntypedFormBuilder, UntypedFormArray  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/shared/services/purchase.service';
import { Utils } from 'src/app/shared/utils';




interface PurchaseInterface {
  name_purchase: string;
  observation_purchase: string;
  state_purchase: string;
  creation_date: string;

}


@Component({
  selector: 'app-purchase-print-purchase',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit {
  purchaseForm: FormGroup;
  purchaseFormEdit: UntypedFormGroup;
  purchaseFormSub: Subscription;
  loading: boolean;
  purchaseExists: boolean;
  viewMode:'new-purchase' | 'edit-purchase' | 'print-purchase' = 'new-purchase';
  purchaseId: string;
  saving: boolean;
  purchase: any = {};
  isNew: boolean;
  id: string;
  purchases: PurchaseInterface = {
    name_purchase: '',
    observation_purchase: '',
    state_purchase: 'Activo',
    creation_date: ''
  };



  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private purchaseService: PurchasesService
  ) {

    this.purchaseForm = this.formBuilder.group({
      name_purchase: [
            '',
            [
              Validators.required,
              Validators.maxLength(80),
              Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
            ],
            (control) => this.validatePurchaseExist(control)
          ],
          
          
          observation_purchase: ['', Validators.maxLength(100)]
        });
  
    // this.purchaseForm = this.fb.group({
    //   name_purchase: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.maxLength(80),
    //       Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
    //     ],
    //     (control) => this.validatePurchaseExist(control)
    //   ],
      
      
    //   observation_purchase: ['', Validators.maxLength(100)]
    // });
  }

  ngOnInit() {
   let id =  this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.setViewMode();
    this.getPurchase();
    this.buildPurchaseForm(this.purchase);
    if (this.id) {
        this.viewMode = 'print-purchase';
        this.purchaseService.getPurchaseById(id)
            .subscribe(res => {
                this.purchase = res;
                this.buildPurchaseForm(this.purchase);
                
            })
    }
}

  validatePurchaseExist(control: FormControl) {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve(true);
      } else {
        this.purchaseService.getValidatePurchaseExist(control.value).subscribe(
          (isAvailable) => {
            this.purchaseExists = isAvailable;
            resolve(this.purchaseExists ? { purchaseTaken: true } : null);
          },
          (error) => {
            
            this.purchaseExists = true;
            resolve({ purchaseTaken: true });
          }
        );
      }
    });
  }
  
  getPurchase() {
    this.id = this.route.snapshot.params['id_purchase'];
    console.log(this.id);
    this.purchaseService.getPurchaseById(parseInt(this.id)).subscribe(
        (data) => {
            this.purchase = data;
            console.log(this.purchase);
        },
        (error) => {
            console.error('Error al obtener rol:', error);
        }
    );
}

  createPurchase() {
    this.purchaseForm.markAllAsTouched();
    if (this.purchaseForm.valid) {
      const purchaseData = this.purchaseForm.value;
      this.loading = true;
  
      this.purchaseService.createPurchase(purchaseData).subscribe(
        () => {
          this.loading = false;
          this.submit();
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Ocurrió un error al crear la categoría.', 'Error');
        }
      );
    } else {
      this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
    }
  }
  

  cancel() {

      this.router.navigateByUrl('/purchases');
}


        
submit() {
  if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
          this.loading = false;
          this.toastr.success('Categoría registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
          setTimeout(() => {
              this.router.navigateByUrl('/purchase');
          }, 3000);
      }, 3000);
  }
}



setViewMode() {
  const currentRoute = this.router.url;
  if (currentRoute.includes('/new')) {
    this.viewMode = 'new-purchase';
  } else if (currentRoute.includes('/print-purchase')) {
    this.viewMode = 'print-purchase';
  }
}

buildPurchaseForm(i: any = {}) {
  this.purchaseForm = this.fb.group({
    id: [i.id_purchase],
    datePurchaseCreation: [i.creation_date_purchase ? Utils.dateToNgbDate(i.creation_date_purchase) : {}],
    editPurchase: this.fb.group({
      name_purchase: [i.editPurchase ? i.editPurchase.name_purchase : ''],
      observation_purchase: [i.editPurchase ? i.editPurchase.observation_purchase : ''],
      state_purchase: [i.editPurchase ? i.editPurchase.state_purchase : ''],
      creation_date_purchase: ['']
    }),
  });

  // Escucha los cambios de valor y calcula el total si es necesario.
  if (this.purchaseFormSub) {
    this.purchaseFormSub.unsubscribe();
  }
}



savePurchase() {
  this.saving = true;
  this.purchase = this.purchaseForm.value;
  this.purchase.orderDate = Utils.ngbDateToDate(this.purchaseForm.value.orderDate);
  this.purchaseService.savePurchase(this.purchaseForm.value)
      .subscribe((savedPurchase: any) => {
          this.viewMode = 'print-purchase';
          this.saving = false;
          this.toastr.success('Categoria Actualizada Correctamente', 'Éxito!', { timeOut: 3000 });
          if(this.isNew) {
              this.router.navigateByUrl('/purchase/edit/'+savedPurchase.id);
          }
      });
}



print() {
  if (window) {
      window.print();
  }
}


}
