import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,UntypedFormGroup, UntypedFormBuilder, UntypedFormArray  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Utils } from 'src/app/shared/utils';




interface CategoryInterface {
  name_category: string;
  observation_category: string;
  state_category: string;
  creation_date: string;

}


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
  category: CategoryInterface = {
    name_category: '',
    observation_category: '',
    state_category: 'Activo',
    creation_date: ''
  };



  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriesService: CategoriesService
  ) {

    this.categoryForm = this.formBuilder.group({
      name_category: [
            '',
            [
              Validators.required,
              Validators.maxLength(80),
              Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
            ],
            (control) => this.validateCategoryExist(control)
          ],
          
          
          observation_category: ['', Validators.maxLength(100)]
        });
  
    // this.categoryForm = this.fb.group({
    //   name_category: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.maxLength(80),
    //       Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
    //     ],
    //     (control) => this.validateCategoryExist(control)
    //   ],
      
      
    //   observation_category: ['', Validators.maxLength(100)]
    // });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildCategoryForm(this.categories);
        this.setViewMode();
        this.getCategory();
  }
    
  
buildCategoryForm(i: any = {}) {
  this.categoryForm = this.fb.group({
    id: [i.id_category],
    dateCategoryCreation: [i.creation_date_category ? Utils.dateToNgbDate(i.creation_date_category) : {}],
    editCategory: this.fb.group({
      name_category: [i.editCategory ? i.editCategory.name_category : ''],
      observation_category: [i.editCategory ? i.editCategory.observation_category : ''],
      state_category: [i.editCategory ? i.editCategory.state_category : ''],
      creation_date_category: ['']
    }),
  });

  // Escucha los cambios de valor y calcula el total si es necesario.
  if (this.categoryFormSub) {
    this.categoryFormSub.unsubscribe();
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

getCategory() {
  this.id = this.route.snapshot.params['id_category'];
  console.log(this.id);
  this.categoriesService.getCategoryById(this.id).subscribe(
      (data) => {
          this.categories = data;
          console.log(this.category);
          
      },
      (error) => {
          console.error('Error al obtener Categoria:', error);
      }
  );
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
  
 

  createCategory() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.loading = true;
  
      this.categoriesService.createCategory(categoryData).subscribe(
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

      this.router.navigateByUrl('/categories');
}


        
submit() {
  if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
          this.loading = false;
          this.toastr.success('Categoría registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
          setTimeout(() => {
              this.router.navigateByUrl('/categories');
          }, 3000);
      }, 3000);
  }
}








saveCategory() {
  this.saving = true;
  this.categories = this.categoryForm.value;
  this.categories.orderDate = Utils.ngbDateToDate(this.categoryForm.value.orderDate);
  this.categoriesService.saveCategory(this.categoryForm.value)
      .subscribe((savedCategory: any) => {
          this.viewMode = 'print';
          this.saving = false;
          this.toastr.success('Categoria Actualizada Correctamente', 'Éxito!', { timeOut: 3000 });
          if(this.isNew) {
              this.router.navigateByUrl('/categories/edit/'+savedCategory.id);
          }
      });
}



print() {
  if (window) {
      window.print();
  }
}


}
