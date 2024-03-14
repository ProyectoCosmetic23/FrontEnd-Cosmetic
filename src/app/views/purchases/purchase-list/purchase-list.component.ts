import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PurchasesService } from "src/app/shared/services/purchase.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ProvidersService } from "src/app/shared/services/provider.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as flatted from "flatted";
import { AuthService } from "src/app/shared/services/auth.service";

// ...

@Component({
  selector: "app-purchase-list",
  templateUrl: "./purchase-list.component.html",
  styleUrls: ["./purchase-list.component.scss"],
})
export class PurchaseListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  listPurchases: any[] = [];
  filteredPurchases: any[] = [];
  list: any[] = [];
  purchases: any[] = [];
  offset: number = 0;
  itemsPerPage = 6;
  currentPage = 1;
  modalAbierto = false;
  loading: boolean;
  providers: any = {};
  countLabel: number;
  reasonForm: FormGroup;
  reasonAnulate = {};
  showLoadingScreen: boolean;

  constructor(
    private _purchaseService: PurchasesService,
    private providersService: ProvidersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.validateUserPermissions("Compras");
    this.reasoniniForm();
    this.getPurchases();
    this.providersService.getAllProviders().subscribe((providers: any[]) => {
      providers.forEach((provider) => {
        this.providers[provider.id_provider] = provider.name_provider;
      });
    });
  }

  getPurchasesCancel() {
    this.showLoadingScreen = false;
    this._purchaseService.getAllPurchase().subscribe(
      (data) => {
        this.listPurchases = data;
        this.filteredPurchases = this.listPurchases;
        this.sortListPurchases();
      },
      (error) => {
        console.error("Error al obtener Categorías:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }
  getPurchases() {
    this.showLoadingScreen = true;
    this._purchaseService.getAllPurchase().subscribe(
      (data) => {
        this.listPurchases = data;
        this.filteredPurchases = this.listPurchases;
        this.sortListPurchases();
      },
      (error) => {
        console.error("Error al obtener Categorías:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }

  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  //  actualizar el valor visual de count según tus necesidades
  actualizarCountLabel() {
    this.countLabel = this.filteredPurchases.length;
  }

  sortListPurchases() {
    this.filteredPurchases.sort((a, b) => {
      if (a.id_purchase > b.id_purchase) {
        return -1;
      }
      if (a.id_purchase > b.id_purchase) {
        return 1;
      }
      return 0;
    });
  }
 
  searchPurchase($event) {
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
  
    const value = ($event.target as HTMLInputElement).value;
    const normalizedValue = normalizeString(value);
  
    if (normalizedValue !== null && normalizedValue !== undefined && normalizedValue !== "") {
      this.filteredPurchases = this.listPurchases.filter(
        (c) =>
          normalizeString(c.provider.name_provider.toLowerCase()).indexOf(normalizedValue.toLowerCase()) !== -1 ||
          normalizeString(this.changePuchaseStateDescription(c.state_purchase))
            .toLowerCase()
            .indexOf(normalizedValue.toLowerCase()) !== -1 ||
          normalizeString(c.invoice_number).indexOf(normalizedValue.toLowerCase()) !== -1 ||
          normalizeString(c.purchase_date).indexOf(normalizedValue.toLowerCase()) !== -1 ||
          normalizeString(c.total_purchase).indexOf(normalizedValue.toLowerCase()) !== -1
      );
    } else {
      this.filteredPurchases = this.listPurchases;
    }
  }
  

  changePuchaseStateDescription(state_purchase: boolean) {
    return state_purchase ? "Activo" : "Anulada";
  }

  private reasoniniForm(): void {
    this.reasonForm = this.formBuilder.group({
      reason_anulate: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(220),
        ],
      ],
    });
  }

 

  @ViewChild("changeStatusModal", { static: true }) changeStatusModal: any;

  currentPurchaseState: any;

  async modalStatus(IdPurchase: number, $event?: any): Promise<void> {
    try {
      const currentPurchaseState = await this.getCurrentPurechaseState(IdPurchase);
  
      const result = await this.modalService
        .open(this.changeStatusModal, { centered: true, backdrop: 'static', keyboard: false })
        .result;
  
      if (result === "Ok") {
      
        const reasonAnulate = this.reasonForm.get("reason_anulate").value;
  
        this._purchaseService
          .PurchaseChangeStatus(IdPurchase, reasonAnulate)
          .subscribe(
            (data) => {
              this.loading = false;
              this.toastr.success(
                "Cambio de estado realizado con éxito.",
                "Proceso Completado",
                {
                  progressBar: true,
                  timeOut: 2000,
                }
              );
              this.getPurchases();
              this.modalAbierto = false;
              this.reasonForm.get("reason_anulate").setValue(null);
            },
            (error) => {
              this.loading = false;
              this.toastr.error(
                "Fallo al realizar el cambio de estado.",
                "Error",
                {
                  progressBar: true,
                  timeOut: 2000,
                }
              );
              console.error("Error al cambiar de estado:", error);
            }
          );
      } else if (result === "Cancel" || (result && result.dismissedWith === 'cancel')) {
        this.getPurchasesCancel();
        this.modalAbierto = false;
        this.reasonForm.get("reason_anulate").setValue(null);
      }
    } catch (error) {
      console.error("Error al obtener detalles de la compras:", error);
    }
  }
  
  
// Método para obtener el estado actual de la categoría (ahora es asíncrono)
async getCurrentPurechaseState(IdPurchase: number): Promise<any> {
  try {
    const purchaseDetails = await this._purchaseService.getPurchaseById(IdPurchase).toPromise();
    return purchaseDetails;
  } catch (error) {
    console.error("Error al obtener detalles de la compras:", error);
    throw error; // Rechaza la promesa para que se maneje en la función llamadora
  }
}
  

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
