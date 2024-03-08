import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormArray,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "src/app/shared/services/category.service";
import { CategoryFormMode } from "../models/category.model";
import { Utils } from "src/app/shared/utils";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-category-print",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.scss"],
})
export class CategoryDetailComponent implements OnInit {
  categoryForm: FormGroup;
  categoryFormEdit: UntypedFormGroup;
  categoryFormSub: Subscription;
  loading: boolean;
  categoryExists: boolean;
  viewMode: "new" | "edit" | "print" = "new";
  saving: boolean;
  categories: any = {};
  isNew: boolean;
  id: string;
  categoryData: CategoryFormMode;
  showLoadingScreen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriesService: CategoriesService,
    private _authService: AuthService
  ) {}
  //METODO DE INICIALIZACION DE FORMULARIOS Y GETS
  ngOnInit() {
    this._authService.validateUserPermissions("Categorías de Productos");
    this.id = this.route.snapshot.params["id_category"];
    console.log(this.id);
    this.isNew = !this.id;
    this.setViewMode();
    this.initializeForm(Number(this.id));
  }
  private initializeForm(id: number): void {
    const nameValidators =
      this.viewMode === "new"
        ? (control) => this.validateCategoryExist(control)
        : "";

    this.categoryForm = this.formBuilder.group({
      id_category: [""],
      name_category: ["",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-ZáéíóúñÑ]+(?:[a-zA-ZáéíóúñÑ ]*[a-zA-ZáéíóúñÑ])?$"),
          Validators.minLength(3),
        ],
        nameValidators,
      ],
      observation_category: [
        "",
        [Validators.required, Validators.maxLength(100)],
      ],
      state_category: [],
      creation_date_category: [],
      reason_anulate: [""],
    });

    if (this.viewMode === "print") {
      this.categoryForm.disable();
    }

    if (this.viewMode === "edit") {
      this.stateCategory.disable();
      this.dateCategory.disable();
    }

    if (this.viewMode !== "new") {
      this.getCategoryById(id);
    }
  }

  //CONSULTAR LA CATEGORIA
  private getCategoryById(id: number): void {
    this.showLoadingScreen = true;
    this.loading = true;
    this.categoriesService.getCategoryById(id).subscribe({
      next: (response: any) => {
        this.categoryData = new CategoryFormMode(response);
        this.setDataCategory();
      },
      error: (err) => {
        console.log("err", err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.showLoadingScreen = false;
      },
    });
  }

  //SET PARA EDITAR
  private setDataCategory(): void {
    if (this.categoryData) {
      this.idCategory.setValue(this.categoryData.id_category);
      this.categoryForm.setValue(this.categoryData);
      this.dateCategory.setValue(
        Utils.ngbDateToDate(this.categoryForm.value.creation_date_category)
      );
    }
  }

  //VALIDAR SI YA EXISTE EL NOMBRE DE UNA CATEGORIA
  validateCategoryExist(control: FormControl) {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve(true);
      } else {
        this.categoriesService
          .getValidateCategoryExist(control.value)
          .subscribe(
            (isAvailable) => {
              this.categoryExists = isAvailable;
              resolve(this.categoryExists ? { categoryTaken: true } : null);
            },
            (error) => {
              this.categoryExists = true;
              resolve({ categoryTaken: true });
            }
          );
      }
    });
  }

  //CREAR LA CATEGORIA

  createCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.loading = true;
      this.categoriesService.createCategory(categoryData).subscribe(
        (response) => {
          this.loading = false;
          console.log("Éxito al crear categoría: ", response);
          this.submit();
        },
        (error) => {
          this.loading = false;
          console.error("Error al crear categoría: ", this.toastr.error);
          const errorMessage = error.error
            ? error.error
            : "Ocurrió un error al crear el categoría.";
          this.toastr.error(errorMessage, "Error");
        }
      );
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  //GUARDAR CAMBIOS AL EDITAR
  saveCategoryChanges(id: number, updatedData: any) {
    this.categoriesService.updateCategory(id, updatedData).subscribe(
      (response) => {
        this.loading = false;
        this.submit();
      },
      (error) => {
        this.loading = false;
        console.error("Error al editar categoría: ", this.toastr.error);
        const errorMessage = error.error
          ? error.error
          : "Ocurrió un error al editar el categoría.";
        this.toastr.error(errorMessage, "Error");
      }
    );
  }

  //SUBMIT PARA BOTONES SEGU LA VISTA
  public submitCategory(): void {
    if (this.viewMode == "new") {
      this.createCategory();
    } else if (this.viewMode == "edit") {
      this.saveChanges();
    }
  }

  //GUARDAR EL CREAR
  saveChanges() {
  
    if (this.categoryForm.valid) {
      const id = Number(this.id); // Convierte el ID a número
      const updatedData = {
        id_category: this.idCategory.value,
        name_category: this.categoryForm.get("name_category").value,
        observation_category: this.categoryForm.get("observation_category")
          .value,
      };
      this.saveCategoryChanges(id, updatedData);
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  //RETORNAR A LA LISTA DE CATEGORIAS
  cancel() {
    this.router.navigateByUrl("/categories");
  }

  //CONFIRMAR REGISTRO
  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      
        if (this.viewMode === 'new') {
          this.toastr.success("Categoría registrada con éxito.", "Éxito", {
            progressBar: true,
            timeOut: 3000,
          });
          setTimeout(() => {
            this.router.navigateByUrl("/categories");
          });
        } else if (this.viewMode === 'edit') {
          this.toastr.success("Categoría modificada con éxito.", "Éxito", {
            progressBar: true,
            timeOut: 3000,
          });
          setTimeout(() => {
            this.router.navigateByUrl("/categories");
          });
        }
      }, 0);
    }
  }

  //METODO QUE CONDICIONA LA RUTA PARA LA VISTA
  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new"; // Corrige la ortografía de 'new-category'
    } else if (currentRoute.includes("/edit/")) {
      this.viewMode = "edit"; // Corrige la ortografía de 'edit-category'
    } else if (currentRoute.includes("/detail/")) {
      this.showLoadingScreen = true;
      this.viewMode = "print";
    }
  }

  //CONSULTA PARA EL VER DETALLE
  get idCategory() {
    return this.categoryForm.get("id_category");
  }

  get stateCategory() {
    return this.categoryForm.get("state_category");
  }

  get dateCategory() {
    return this.categoryForm.get("creation_date_category");
  }
}
