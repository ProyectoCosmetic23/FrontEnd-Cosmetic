import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,UntypedFormGroup, UntypedFormBuilder, UntypedFormArray  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Utils } from 'src/app/shared/utils';
import { CategoryFormMode } from '../models/category.model';




@Component({
  selector: 'app-category-print',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  categoryForm: FormGroup;
  categoryFormEdit: UntypedFormGroup;
  categoryFormSub: Subscription;
  loading: boolean;
  categoryExists: boolean;
  viewMode: 'new' | 'edit' | 'print' = 'new';
  saving: boolean;
  categories: any = {};
  isNew: boolean;
  id: string;
  categoryData: CategoryFormMode;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriesService: CategoriesService,

  ) {


  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id_category'];
    console.log(this.id);
    this.isNew = !this.id;
    this.setViewMode();
    this.inicializateForm(Number(this.id));
}

private inicializateForm(id: number): void {
    this.categoryForm = this.formBuilder.group({
        id_category: [''],
        name_category:['',[ Validators.required, Validators.maxLength(80),Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),], (control) => this.validateCategoryExist(control)],
        observation_category: ['', [Validators.required,Validators.maxLength(100)]],
        state_category: [],
        creation_date_category: []
    });

    if (this.viewMode == 'print') {
        this.categoryForm.disable();
    }

    if (this.viewMode == 'edit') {
        this.stateCategory.disable();
        this.dateCategory.disable();
    }

    if (this.viewMode != 'new') {
        this.getCategoryById(id);
    }

}


private getCategoryById(id: number): void {
  this.loading = true;
  this.categoriesService.getCategoryById(id).subscribe({
      next: (response: any) => {
          this.categoryData = new CategoryFormMode(response);
          this.setDataCategory();
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

private setDataCategory(): void {
  if (this.categoryData) {
      this.idCategory.setValue(this.categoryData.id_category)
      this.categoryForm.setValue(this.categoryData)
      this.dateCategory.setValue(Utils.ngbDateToDate(this.categoryForm.value.creation_date_category));
 
  }
}

createCategory() {
  if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.loading = true;
      this.categoriesService.createCategory(categoryData).subscribe(
          (response) => {
              this.loading = false;
              console.log("Éxito al crear caetgoría: ", response);
              this.submit();
          },
          (error) => {
              this.loading = false;
              console.error("Error al crear caetgoría: ", this.toastr.error);
              const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el caetgoría.';
              this.toastr.error(errorMessage, 'Error');
          }
      );
  } else {
      this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
  }
}


validateCategoryExist(control: FormControl) {
  return new Promise((resolve) => {
    if (!control.value) {
      resolve(true);
    } else {
      this.categoriesService.getValidateCategoryExist(control.value).subscribe(
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



  saveCategoryChanges(id: number, updatedData: any) {
    this.categoriesService.updateCategory(id, updatedData).subscribe(
        (response) => {
            this.loading = false;
            this.submit();
        },
        (error) => {
            this.loading = false;
            console.error("Error al crear caetgoría: ", this.toastr.error);
            const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el caetgoría.';
            this.toastr.error(errorMessage, 'Error');
        }
    );
  }


public submitCategory(): void {
  if (this.viewMode == 'new') {
      this.createCategory();
  } else if (this.viewMode == 'edit') {
      this.saveChanges();
  }
}


saveChanges() {
  console.log('editar');

  if (this.categoryForm.valid) {
    const id = Number(this.id); // Convierte el ID a número
    const updatedData = {
      id_category: this.idCategory.value,
      name_category: this.categoryForm.get('name_category').value,
      observation_category: this.categoryForm.get('observation_category').value,
    };
    this.saveCategoryChanges(id, updatedData);
  } else {
    this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
  }
}




  cancel() {

    this.router.navigateByUrl('/categories');
  }


      
  submit() {
  if (!this.loading) {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.toastr.success('Categoría registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000});
        setTimeout(() => {
            this.router.navigateByUrl('/categories');
        }, );
    },);
  }
  }




    setViewMode() {
      const currentRoute = this.router.url;
      if (currentRoute.includes('/new')) {
        this.viewMode = 'new'; // Corrige la ortografía de 'new-category'
      } else if (currentRoute.includes('/edit/')) {
        this.viewMode = 'edit'; // Corrige la ortografía de 'edit-category'

      } else if (currentRoute.includes('/detail/')) {
        this.viewMode = 'print';
      }
    }







  print() {
    if (window) {
        window.print();
    }
  }

  get idCategory() {
    return this.categoryForm.get('id_category');
  }

  get stateCategory() {
    return this.categoryForm.get('state_category');
  }

 get dateCategory() {
  return this.categoryForm.get('creation_date_category');
}







}

