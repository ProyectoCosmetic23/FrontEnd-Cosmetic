import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl } from "@angular/forms";
import { ProductService } from "src/app/shared/services/product.service";
import { CookieService } from "ngx-cookie-service";
import { debounceTime } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { CategoriesService } from 'src/app/shared/services/category.service';
import { ProductFormModel } from "../models/product.model";




@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listProducts: any[];
  filteredProducts: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  modalAbierto = false;
  selectedProductId: number;
  selectedProductValue: number;
  returnQuantity: number = 0;
  calculatedValue: number = 0;
  returnReason: string = "";
  returnValue: number;
  countLabel: number;
  rowIndex: number;
  reasonAnulate: string = "";
  categories: { [key: number]: string } = {};
  itemsPerPage = 6; // El número de filas por página
  showLoadingScreen: boolean=false;
  
  constructor(
    private _productService: ProductService,
    private cookieService: CookieService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _authService: AuthService,
    private catService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._authService.validateUserPermissions("Productos");
    this.getProducts();
    this.loadCategories();
    this.rowIndex = 0;
  }

  loadCategories() {
    this.catService.getAllCategory().subscribe((categorias: any[]) => {
        categorias.forEach(categoria => {
            this.categories[categoria.id_category] = categoria.name_category;
        });
    });
}

  getProducts() {
    this.showLoadingScreen = true;
    this._productService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
        this.filteredProducts = this.listProducts;
        this.sortListProdcuctsById();
      },
      (error) => {
        console.error("Error al obtener Productos:", error);
      }
      )
      .add(() => {
        this.showLoadingScreen = false;
    });
  }

  

  handleChange(event: any, row: any) {
    row.state_product = event.target.checked ? "Activo" : "Inactivo";
 
  }

  getProductNameById(productId: number): string {
    const product = this.listProducts.find((p) => p.id_product === productId);
    return product ? product.name_product : "";
  }

  calculateUpdatedValue(originalValue: number): number {
    // Asegúrate de que returnQuantity esté definido en tu componente
    return this.returnQuantity * originalValue;
  }
  sortListProdcuctsById() {
    this.filteredProducts.sort((a, b) => {
      if (a.id_product > b.id_product) {
        return -1;
      }
      if (a.id_product > b.id_product) {
        return 1;
      }
      return 0;
    });
  }

  loadData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    const totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );

    if (this.currentPage === totalPages) {
      const remainingRows = this.filteredProducts.length % this.itemsPerPage;
      if (remainingRows > 0) {
        endIndex = startIndex + remainingRows;
      }
    }

    // Ajusta endIndex para que sea el próximo número divisible por 6
    const rowsToAdd = 6 - (endIndex % 6);
    endIndex += rowsToAdd;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset + 1;
    this.loadData();
  }
 
searchProduct($event) {
  const value = ($event.target as HTMLInputElement).value.trim().toLowerCase(); // Eliminar espacios en blanco y convertir a minúsculas
  if (value !== "") {
    this.filteredProducts = this.listProducts.filter(
      (product) =>
        product.name_product.toLowerCase().includes(value) || // Buscar coincidencias parciales del nombre
        (product.quantity && product.quantity.toString().toLowerCase().includes(value)) || // Buscar coincidencias parciales de la cantidad
        (product.cost_price && product.cost_price.toString().toLowerCase().includes(value)) || 
        (product.state_product.toLowerCase().slice(0, 3) === value.toLowerCase() || product.state_product.toLowerCase() === value.toLowerCase()) || // Buscar coincidencias de estado
        (this.categories[product.categoryId] && (this.categories[product.categoryId].toLowerCase().includes(value) || this.categories[product.categoryId].toLowerCase() === value.toLowerCase() || this.categories[product.categoryId].toLowerCase().startsWith(value.toLowerCase()))) // Buscar coincidencias del nombre de la categoría
    );
  } else {
    this.filteredProducts = this.listProducts;
  }
  this.loadData();
}

  
  openRetireModal(productId: number, productValue: number, content: any): void {
    this.selectedProductId = productId;
    this.selectedProductValue = productValue;
    this.returnQuantity = 0;
    this.returnReason = "";
    this.returnValue;
    this.modalService.open(content, {  centered: true,backdrop: 'static', keyboard: false});
  }

  retireProduct(): void {
    if (this.selectedProductId && this.returnQuantity) {
      // Encuentra el producto en tu lista local
      const productToUpdate = this.filteredProducts.find(
        (product) => product.id_product === this.selectedProductId
      );
  
      if (productToUpdate && productToUpdate.quantity >= this.returnQuantity) {
        const data = {
          return_quantity: this.returnQuantity,
          return_reason: this.returnReason,
          return_value: this.returnValue,
        };
  
        // Llamada a la API para dar de baja el producto
        this._productService.retireProduct(this.selectedProductId, data)
          .subscribe(
            (response) => {
              this.updateProductQuantity(this.selectedProductId, this.returnQuantity);
              this.toastr.success(
                "Producto dado de baja exitosamente.",
                "Proceso Completado",
                { progressBar: true, timeOut: 2000 }
              );
              this.modalService.dismissAll();
            },
            (error) => {
              console.error("Error al dar de baja el producto", error);
              this.toastr.error("Fallo al dar de baja el producto.", "Error", {
                progressBar: true,
                timeOut: 2000,
              });
            }
          );
      } else {
        this.toastr.error("La cantidad a dar de baja es mayor que la cantidad disponible.", "Error", {
          progressBar: true,
          timeOut: 2000,
        });
      }
    }
  }
  

  getCategoryById(categoryId: number) {
    this._productService.getCategoryById(categoryId).subscribe(
        (category) => {
            console.log('Categoría obtenida:', category);
            // Encuentra el producto correspondiente en la lista de productos
            const productToUpdate = this.listProducts.find(p => p.id_category === categoryId);
            // Si se encuentra el producto, actualiza el nombre de la categoría
            if (productToUpdate) {
                productToUpdate.categoryName = category.name_category; // Suponiendo que el nombre de la categoría está en la propiedad 'name' del objeto 'category'
            }
        },
        (error) => {
            console.error('Error al obtener la categoría:', error);
        }
    );
}

isNearMinimum(product: any): boolean {
  console.log('Cantidad:', product.quantity);
  console.log('Stock mínimo:', product.stockMinimo);
  const nearMinimum = product.quantity <= product.stockMinimo;
  console.log('¿Está cerca del mínimo?', nearMinimum);
  return nearMinimum;
}




  updateProductQuantity(productId: number, quantityToSubtract: number): void {
    // Encuentra el producto en tu lista local y resta la cantidad
    const productToUpdate = this.filteredProducts.find(
      (product) => product.id_product === productId
    );

    if (productToUpdate) {
      productToUpdate.quantity -= quantityToSubtract;
    }
  }
  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idProduct: number) {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      this.modalService
      .open(this.deleteConfirmModal, {  centered: true,backdrop: 'static', keyboard: false})
      .result.then(
        (result) => {
          if (result === "Ok") {
            // Verifica si reasonAnulate está presente y no es una cadena vacía

            const token = this.cookieService.get("token");

            // Realiza la llamada al servicio solo si la razón de anulación es válida
            this._productService
              .productChangeStatus(idProduct, token, this.reasonAnulate)
              .subscribe(
                (data) => {
                  this.loading = false;
                  this.toastr.success(
                    "Cambio de estado realizado con éxito.",
                    "Proceso Completado",
                    { progressBar: true, timeOut: 2000 }
                  );
                  this.getProducts();
                  this.modalAbierto = false;
                },
                (error) => {
                  this.loading = false;
                  this.toastr.error(
                    "Fallo al realizar el cambio de estado.",
                    "Error",
                    { progressBar: true, timeOut: 2000 }
                  );
                  console.error("Error al cambiar de estado:", error);
                  
                }
              );
          }
        },
        (reason) => {
          // Manejar la cancelación del modal aquí
          this.reasonAnulate = '';
          this.getProducts();
          this.modalAbierto = false;
        }
      );
    }
  }
}