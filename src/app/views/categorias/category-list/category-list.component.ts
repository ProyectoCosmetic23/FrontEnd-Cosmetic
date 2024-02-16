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
    this._categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;
        this.filteredCategories = this.listCategories;
        this.sortListCategoriesById();
      },
      (error) => {
        console.error("Error al obtener Categorías:", error);
      }
    );
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
    const value = ($event.target as HTMLInputElement).value;
    if (value !== null && value !== undefined && value !== "") {
      this.filteredCategories = this.listCategories.filter(
        (c) =>
          c.name_category.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          this.changeCategoryStateDescription(c.state_category)
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1
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
          Validators.maxLength(220),
        ],
      ],
    });
  }

  //CAMBIAR ESTADO

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  modalStatus(IdCategory: number, $event?: any): void {
    this.modalService
      .open(this.deleteConfirmModal, { centered: true })
      .result.then((result) => {
        if (result === "Ok") {
          const isChecked = ($event.target as HTMLInputElement).checked;
          const reasonAnulate = this.reasonForm.get("reason_anulate").value;
          const serializedReason = flatted.stringify(reasonAnulate);
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
                this.getCategories();
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
        } else if (result === "Cancel") {
          this.modalAbierto = false;
        }
      });
  }
}
