import { Component, OnInit,ViewChild  } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// ...

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  listCategories: any[] = [];
  filteredCategories: any[] = [];
  categories: any[] = [];
  offset: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  viewMode: 'new' | 'edit' | 'print' = 'new';
  modalAbierto = false;
  loading: boolean;

  constructor(
    private _categoryService: CategoriesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void{
    this._categoryService.getAllCategory().subscribe((res: any[]) => {
      this.listCategories = [...res];
      this.filteredCategories = res;
    });

    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filterData(value);
    });
  }

  // filterData(val) {
  //   if (val) {
  //     val = val.toLowerCase();
  //     this.filteredCategories = this.categories.filter(category => {
  //       return Object.values(category).some(value => {
  //         if (value && value.toString().toLowerCase().includes(val)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     });
  //   } else {
  //     this.filteredCategories = [...this.listCategories];
  //   }
  // }

  filterData(val) {
    if (val) {
        val = val.toLowerCase();
    } else {
        return this.filteredCategories = [...this.categories];
    }

    const columns = Object.keys(this.categories[0]);
    if (!columns.length) {
        return;
    }

    const rows = this.categories.filter(function (d) {
        for (let i = 0; i <= columns.length; i++) {
            const column = columns[i];
            if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                return true;
            }
        }
    });
    this.filteredCategories = rows;
}





  onPageChange(event: any) {
    console.log('onPageChange: ', event);
    this.currentPage = event.offset +1;
    this.loadData(); // Llama a loadData al cambiar de página
  }
  
  loadData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    const totalPages = Math.ceil(this.listCategories.length / this.pageSize);

    if (this.currentPage === totalPages) {
        const remainingRows = this.listCategories.length % this.pageSize;
        if (remainingRows > 0) {
            endIndex = startIndex + remainingRows;
        }
    }

    // Ajusta el índice para que sea el próximo número divisible por 6 
    const rowsToAdd = 6 - (endIndex % 6);
    endIndex += rowsToAdd;

    this.filteredCategories = this.listCategories.slice(startIndex, endIndex);

    console.log('load data charged');
  }

  sortListCategoryById() {
    this.listCategories.sort((a, b) => a.id_category - b.id_category);
}


  getCategories() {
    this._categoryService.getAllCategory().subscribe(
        (data) => {
            this.listCategories = data;
            this.sortListCategoryById();
        },
        (error) => {
            console.error('Error al obtener categorías:', error);
        }
    );
  }
  

  @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

  openModal(idCategory: number) {
      this._categoryService.getCategoryById(idCategory).subscribe
      if (!this.modalAbierto) {
          this.modalAbierto = true;
          this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
              (result) => {
                  if (result === 'Ok') {
                      this._categoryService.CategoryChangeStatus(idCategory).subscribe(
                          (data) => {

                              this.loading = false;
                              this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                              console.log(data);

                              setTimeout(() => {
                                  location.reload();
                              }, 2000);
                          },
                          (error) => {
                              this.loading = false;
                              this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                              console.error('Error al cambiar de estado:', error);
                          }
                      );
                  } else if (result === 'Cancel') {
                      this.modalAbierto = false;
                      setTimeout(() => {
                          location.reload();
                      }, 2000);
                  }
              },
              (reason) => {
                  this.modalAbierto = false;
                  location.reload();
              }
          );
      }
  }


}
