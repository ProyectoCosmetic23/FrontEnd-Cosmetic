import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriesService } from "src/app/shared/services/category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import * as flatted from "flatted";
import { AuthService } from "src/app/shared/services/auth.service";
import { CategoryFormMode } from "../models/category.model";
@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent {
  loading: boolean;
  listCategories: any[] = [];
  modalAbierto = false;
  searchControl: UntypedFormControl = new UntypedFormControl();
  filteredCategories: any[] = [];
  currentPage = 1; // Propiedad para rastrear la página actual
  itemsPerPage = 6; // El número de filas por página
  countLabel: number;
  reasonForm: FormGroup;
  reasonAnulate = {};
  showLoadingScreen: boolean;




  constructor(
    private _categoriesService: CategoriesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}
  //inicializa el get
  ngOnInit(): void {
    this._authService.validateUserPermissions("Categorías de Productos");
    this.reasoniniForm();
    this.getCategories();
  }

  //CONSULTA TODAS LAS CATEGORIAS
  getCategories() {
    this.showLoadingScreen = true;
    this._categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;
        this.filteredCategories = this.listCategories;
        this.sortListCategoriesById();
  
      },
      (error) => {
        console.error("Error al obtener Categorías:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }

  getCategoriesCancel() {
    this.showLoadingScreen = false;
    this._categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;
        this.filteredCategories = this.listCategories;
        this.sortListCategoriesById();
  
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
    this.countLabel = this.filteredCategories.length;
  }

  sortListCategoriesById() {
    this.filteredCategories.sort((a, b) => {
      if (a.id_category > b.id_category) {
        return -1;
      }
      if (a.id_category > b.id_category) {
        return 1;
      }
      return 0;
    });
  }
  searchCategory($event) {
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
  
    const value = ($event.target as HTMLInputElement).value;
    const normalizedValue = normalizeString(value);
  
    if (normalizedValue !== null && normalizedValue !== undefined && normalizedValue !== "") {
      this.filteredCategories = this.listCategories.filter(
        (c) =>
          normalizeString(c.name_category.toLowerCase()).indexOf(normalizedValue.toLowerCase()) !== -1 ||
          normalizeString(this.changeCategoryStateDescription(c.state_category))
            .toLowerCase()
            .indexOf(normalizedValue.toLowerCase()) !== -1
      );
    } else {
      this.filteredCategories = this.listCategories;
    }
  }
  
  changeCategoryStateDescription(state_category: boolean) {
    return state_category ? "Activo" : "Inactivo";
  }

  private reasoniniForm(): void {
    this.reasonForm = this.formBuilder.group({
      reason_anulate: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
    });
  }

  handleChange(event: any, row: any) {
    row.state_category = event.target.checked ? true : false;
 
  }
    
  //CAMBIAR ESTADO

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  currentCategoryState: any;

  async modalStatus(IdCategory: number, $event?: any): Promise<void> {
    try {
      const currentCategoryState = await this.getCurrentCategoryState(IdCategory);
  
      const result = await this.modalService
        .open(this.deleteConfirmModal, { centered: true, backdrop: 'static', keyboard: false })
        .result;
  
      if (result === "Ok") {
        const isChecked = ($event?.target as HTMLInputElement)?.checked;
        const reasonAnulate = this.reasonForm.get("reason_anulate").value;
  
        this._categoriesService
          .CategoryChangeStatus(IdCategory, reasonAnulate, isChecked)
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
        this.reasonForm.get("reason_anulate").setValue(null);
        this.getCategoriesCancel();
        this.modalAbierto = false;

      }
    } catch (error) {
      console.error("Error al obtener detalles de la categoría:", error);
    }
  }
  
  
// Método para obtener el estado actual de la categoría (ahora es asíncrono)
async getCurrentCategoryState(IdCategory: number): Promise<any> {
  try {
    const categoryDetails = await this._categoriesService.getCategoryById(IdCategory).toPromise();
    return categoryDetails;
  } catch (error) {
    console.error("Error al obtener detalles de la categoría:", error);
    throw error; // Rechaza la promesa para que se maneje en la función llamadora
  }
}
  


}
