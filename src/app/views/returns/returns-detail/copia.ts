import { Component,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ReturnsService } from "src/app/shared/services/returns.service";
import { OrdersService } from "src/app/shared/services/orders.service";
import { CookieService } from "ngx-cookie-service";
import { PaymentsService } from 'src/app/shared/services/payment.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/shared/services/product.service';


// import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-returns-detail",
  templateUrl: "./returns-detail.component.html",
  styleUrls: ["./returns-detail.component.scss"],
})
export class ReturnsDetailComponent implements OnInit {
  // Propiedades booleanas
  loading: boolean;
  loadingData: boolean;
  isNew: boolean;

  // Propiedades de formulario
  formBasic: FormGroup;
  productsFormArray: FormArray;

  // Propiedades para el modo de vista
  viewMode:  "detaild"= "detaild";

  // Otras propiedades
  id: string;
  orders: any = {};
  orderTotal: any;
  order: any = {};
  listClients: any[] = [];
  listEmployees: any[] = [];
  listProducts: any[] = [];
  order_detail_products: any[] = [];
  numberOfProducts: number = 0;
  selected_employee: string;
  selected_client: string;
  selected_payment_type: string;
  error_payment_type: boolean = false;
  selected_employee_id: number;
  error_employee: boolean = false;
  selected_client_id: number;
  error_client: boolean = false;
  listPayments: any[] = [];

  modalAbierto = false;
  selectedProductId: number;
  selectedProductValue: number;
  returnQuantity: number = 0;
  calculatedValue: number = 0;
  returnReason: string = '';
  returnValue: number ;

  filteredProducts: any[];

  wishToRetire: boolean = false;
  



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService,
    private _returnsService: ReturnsService,
    private _paymentService: PaymentsService,
    private cookieService: CookieService,
    private toastr: ToastrService,


    private _productService: ProductService,
    private modalService: NgbModal
  ) {
    this.productsFormArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    const productGroup = this.createProductGroup();
    this.productsFormArray.push(productGroup);
    this.id = this.route.snapshot.params["id_order"];
    this.isNew = !this.id;
    this.setViewMode();
    this.getClients();
    this.getEmployees();
    this.getProducts();
    this.getOrder();
    this.formBasic = this.formBuilder.group({});
    this.formBasic.addControl("products", this.productsFormArray);
    this.getPaymentsForOrder();
    this.getProducts();
  

  }

  // -------------- INICIO: Método para definir el tipo de vista -------------- //

  // Método que determina el modo de vista (detalle) según la ruta actual
  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/detaild/")) {
      this.viewMode = "detaild";
    }
 
  }
  
  // -------------- INICIO: Métodos para obtener datos -------------- //
  getPaymentsForOrder() {
    if (this.viewMode === 'detaild') {
      // Convertir this.id a número usando parseInt
      const orderId = parseInt(this.id, 10);

      // O alternativamente, usando Number
      // const orderId = Number(this.id);

      this._paymentService.getPayOrder(orderId).subscribe(
        (payments) => {
          // Puedes almacenar los pagos en una propiedad del componente
          this.listPayments = payments;
        },
        (error) => {
          console.error('Error al obtener pagos:', error);
        }
      );
    }
  }
  // Método para obtener un pedido y sus detalles
  getOrder() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/orders/returns/")) {
      // Antes de cargar los datos, establece loadingData en true
      this._returnsService.getOrderById(this.id).subscribe(
        (data) => {
          this.order = data;
          const idClient = this.order.order.id_client;
          const idEmployee = this.order.order.id_employee;
          const orderDetail = this.order.order_detail;

          orderDetail.forEach((detail) => {
            let product_name;
            let product = this.listProducts.find(
              (product) => product.id_product === detail.id_product
            );
            if (product) {
              product_name = product.name_product;
            }
            let product_subtotal =
              detail.product_price * detail.product_quantity;
            detail = {
              id_order: 1,
              id_order_detail: 1,
              id_product: detail.id_product,
              product_name: product_name,
              product_price: detail.product_price,
              product_quantity: detail.product_quantity,
              product_subtotal: product_subtotal,
            };
            if (this.order_detail_products) {
              this.order_detail_products.push(detail);
            }
            console.log(this.order_detail_products);
          });
          this.selected_payment_type = this.order.order.payment_type;

          this.findOrderData(idClient, idEmployee, orderDetail);

          // Después de cargar los datos, establece loadingData en false
          this.loadingData = false;
        },
        (error) => {
          console.error("Error al obtener el pedido:", error);
          this.loadingData = false; // En caso de error, asegúrate de desactivar la pantalla de carga
        }
      );
    }
  }

  // Método para encontrar información relacionada con el pedido (cliente, empleado, productos)
  findOrderData(clientId: number, employeeId: number, products: any) {
    console.log(clientId + " " + employeeId + " " + products.id_product);

    // Busca el nombre del cliente
    const client = this.listClients.find(
      (client) => client.id_client === clientId
    );
    if (client) {
      this.selected_client = client.name_client;
    }

    // Busca el nombre del empleado
    const employee = this.listEmployees.find(
      (employee) => employee.id_employee === employeeId
    );
    if (employee) {
      this.selected_employee = employee.name_employee;
    }
    // Si falta información esencial, recarga la página
    if (
      this.selected_employee === undefined ||
      this.selected_client === undefined
    ) {
      this.loadingData = true;
    }
  }

  // Método para obtener todos los clientes
  getClients() {
    this._returnsService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
       
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    );
  }

  // Método para obtener todos los empleados
  getEmployees() {
    this._returnsService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
        
      },
      (error) => {
        console.error("Error al obtener Empleados:", error);
      }
    );
  }

  // Método para obtener todos los productos
  getProducts() {
    this._returnsService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
      
      },
      (error) => {
        console.error("Error al obtener Productos:", error);
      }
    );
  }

  // Método para obtener el precio unitario de un producto por su ID
  getProductPrice(idProduct: number): number | undefined {
    const product = this.listProducts.find((p) => p.id_product === idProduct);
    return product ? product.product_price : undefined;
  }

  onClientSelected(event: any): void {
    this.selected_client_id = event.target.value;

    if (
      event.target.value == null ||
      event.target.value == "Seleccione el nombre del cliente" ||
      event.target.value == undefined
    ) {
      this.error_client = true;
    } else {
      this.error_client = false;
    }

    // Ahora `selectedClientId` contiene el ID del cliente seleccionado
    console.log("Cliente seleccionado:", this.selected_client_id);
  }

  onEmployeeSelected(event: any): void {
    // Accede al valor seleccionado
    this.selected_employee_id = event.target.value;

    if (
      event.target.value == null ||
      event.target.value == "Seleccione el nombre del empleado" ||
      event.target.value == undefined
    ) {
      // this.error_employee = true;
    } else {
      // this.error_employee = false;
    }

    // Ahora `selectedClientId` contiene el ID del cliente seleccionado
    console.log("Empleado seleccionado:", this.selected_employee_id);
  }

  onPaymentTypeSelected(event: any): void {
    // Accede al valor seleccionado
    this.selected_payment_type = event.target.value;

    if (
      event.target.value == null ||
      event.target.value == "Seleccione el tipo de pago" ||
      event.target.value == undefined
    ) {
      // this.error_payment_type = true;
    } else {
      // this.error_payment_type = false;
    }

    // Ahora `selectedPaymentType` contiene el tipo de pago seleccionado
    console.log("Tipo de pago seleccionado:", this.selected_payment_type);
  }

  // -------------- INICIO: Funciones para manipular Productos -------------- //

  // Método para crear un FormGroup para un producto
  createProductGroup(): FormGroup {
    console.log(this.productsFormArray.value);
    return this.formBuilder.group({
      id_product: [""],
      product_price: [""],
      product_quantity: [""],
      subtotal: [""],
    });
  }

  createReturn():FormGroup{
    console.log(this.productsFormArray.value);
    return this.formBuilder.group({
      id_product: [""],
      product_quantity: [""],
      product_name:[""]
    

    });
    
  }


  // Método para manejar la selección de un producto
  handleProductSelection(event: any, i: number) {
    const selectedProductId = this.productsFormArray
      .at(i)
      .get("id_product").value;

    const selectedProduct = this.listProducts.find(
      (product) => product.id_product == selectedProductId
    );

    if (selectedProduct) {
      this.productsFormArray
        .at(i)
        .get("product_price")
        .setValue(selectedProduct.selling_price);

      // Obtén el valor del campo "unit"
      const unitValue = this.productsFormArray
        .at(i)
        .get("product_quantity").value;

      // Verifica que "unitValue" no sea null ni undefined
      if (unitValue != null && unitValue !== undefined) {
        // Calcula el subtotal en función de la cantidad y el precio unitario
        const subtotal = selectedProduct.selling_price * unitValue;

        // Asigna el subtotal al campo "subtotal" del formulario
        this.productsFormArray.at(i).get("subtotal").setValue(subtotal);
      } else {
        console.log("La cantidad del producto no está definida.");
      }
      console.log(this.productsFormArray.at(i).value);
    } else {
      console.log("Producto no encontrado.");
      this.productsFormArray.at(i).get("product_price").setValue(null);
    }
  }

  // Función para agregar un nuevo producto al FormArray
  addProduct() {
    const productGroup = this.createProductGroup();
    this.productsFormArray.push(productGroup);
    this.numberOfProducts = Object.keys(this.productsFormArray.controls).length;
    console.log(this.numberOfProducts);
  }

  // Función para eliminar un producto del FormArray
  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
    this.numberOfProducts = Object.keys(this.productsFormArray.controls).length;
    console.log(this.numberOfProducts);
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.productsFormArray.length; i++) {
      const subtotal = this.productsFormArray.at(i).get("subtotal").value;
      if (subtotal) {
        total += subtotal;
      }
    }
    console.log(this.productsFormArray);
    return total;
  }

  // -------------- INICIO: Métodos para crear un nuevo Pedido -------------- //

  createOrder() {
    if (!this.formBasic.valid) {
      this.showFormWarning("Completa el formulario correctamente");
      return;
    }

    this.checkProducts();

    this.checkConditions();

    const order_date = new Date();
    const total_order = this.calculateTotal();

    const newOrder = {
      id_client: this.selected_client_id,
      id_employee: this.selected_employee_id,
      order_date: order_date,
      payment_type: this.selected_payment_type,
      total_order: total_order,
      products: this.productsFormArray.value,
    };

    // this.submitOrder(newOrder);
  }

  checkProducts() {
    if (this.productsFormArray.length === 0) {
      this.showFormWarning("Agrega al menos un producto al pedido");
      throw new Error("Productos insuficientes");
    }

    const productsArray = this.productsFormArray.value;
    for (const product of productsArray) {
      if (
        !product.id_product ||
        !product.product_price ||
        !product.product_quantity
      ) {
      
      }
    }
  }

  checkConditions() {
    const conditions = [
      {
        variable: "error_client",
        condition:
          this.selected_client === "Seleccione el nombre del cliente" ||
          this.selected_client_id == null ||
          this.selected_client_id == undefined,
        // errorMessage: "Seleccione un cliente",
      },
      {
        variable: "error_employee",
        condition:
          this.selected_employee === "Seleccione el nombre del empleado" ||
          this.selected_employee_id == null ||
          this.selected_employee_id == undefined,
        // errorMessage: "Seleccione un empleado",
      },
      {
        variable: "error_payment_type",
        condition:
          this.selected_payment_type === "Seleccione el tipo de pago" ||
          this.selected_payment_type == null ||
          this.selected_payment_type == undefined,
        // errorMessage: "Seleccione un tipo de pago",
      },
    ];

    conditions.forEach((condition) => {
      this[condition.variable] =
        this[condition.variable] || condition.condition;

      if (this[condition.variable]) {
        // this.showFormWarning(condition.errorMessage);
        // throw new Error(`${condition.variable} no seleccionado`);
      }
    });

    // Reset errors if all conditions are false
    // if (!conditions.some((condition) => this[condition.variable])) {
    //   conditions.forEach((condition) => {
    //     this[condition.variable] = false;
    //   });
    // }
  }

  showFormWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  // submitOrder(newOrder) {
  //   this._returnsService.createOrder(newOrder).subscribe(
  //     (response) => {
  //       this.showSuccessMessage("Pedido creado exitosamente");
  //       this.router.navigate(["/orders"]);
  //     },
  //     (error) => {
  //       this.handleError("Error al crear el pedido:", error);
  //     }
  //   );
  // }


  // showSuccessMessage(message: string) {
  //   this.toastr.success(message, "Éxito");
  // }

  // handleError(errorMessage: string, error: any) {
  //   console.error(errorMessage, error);
  //   this.toastr.error("Error al crear el pedido", "Error");
  // }





 // Modal para el manejo de devolucion 

 openRetireModal(productId: number, productValue: number, content: any): void {
  this.selectedProductId = productId;
  this.returnReason = '';
  
  // Resto del código...
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
}



    
retireProduct(): void {
    if (this.wishToRetire && this.selectedProductId && this.returnQuantity) {    
        const data = {
            return_quantity: this.returnQuantity,
            return_reason: this.returnReason,
            
        };

        // Llamada a la API para dar de baja el producto
        this._productService.retireProduct(this.selectedProductId, data).subscribe(
            (response) => {
                this.updateProductQuantity(this.selectedProductId, this.returnQuantity);
                this.toastr.success('Producto dado de baja exitosamente.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                this.modalService.dismissAll();

                console.log('Producto dado de baja exitosamente', response);
            },
            (error) => {
                console.error('Error al dar de baja el producto', error);
                this.toastr.error('Fallo al dar de baja el producto.', 'Error', { progressBar: true, timeOut: 2000 });
            }
        );
    }
}





updateProductQuantity(productId: number, quantityToSubtract: number): void {
  const productToUpdate = this.listProducts.find(product => product.id_product === productId);

  if (productToUpdate) {
    productToUpdate.product_quantity -= quantityToSubtract;
  }
}






//PRODUCTOS 
getProductNameById(productId: number): string {
  const product = this.listProducts.find(p => p.id_product === productId);
  return product ? product.name_product : '';
  }

calculateUpdatedValue(originalValue: number): number {
  // Asegúrate de que returnQuantity esté definido en tu componente
  return this.returnQuantity * originalValue;
  }
  
  
  



filterData(value: string) {
  if (value) {
      value = value.toLowerCase();
  } else {
      this.filteredProducts = [...this.listProducts];
      return;
  }

  this.filteredProducts = this.listProducts.filter(productc => {
      const nombreMatch = productc.name_product.toLowerCase().includes(value);
      const cost_priceMatch = productc.cost_price.toLowerCase().includes(value);
      const estadoMatch = productc.state_product.toLowerCase().includes(value);

      return nombreMatch || cost_priceMatch || estadoMatch;
  });


}


//Metodo para manejar la devolucion del producto
cancelOrder(idOrder) {
   this._ordersService.AnulateOrder(idOrder, {
    
   
  });
}


createReplacementOrder() {
  // Recolectar los detalles del pedido original
  const orderDetails = this.order_detail_products.map((product) => {
    return {
      id_product: product.id_product,
      product_name: product.product_name,
      product_price: product.product_price,
      product_quantity: product.product_quantity,
      // Otros detalles del producto si es necesario
    };
  });

  // Crear un nuevo pedido con los detalles recolectados
  const newOrder = {
    id_client: this.selected_client_id,
    id_employee: this.selected_employee_id,
    payment_type: this.selected_payment_type,
    order_detail_products: orderDetails,
    total_order: this.order?.order?.total_order // Usar el total del pedido original
    // Otros detalles del pedido si es necesario
  };

  // Llamar al servicio para crear el nuevo pedido
  this._ordersService.createOrder(newOrder).subscribe(
    (response) => {
      console.log('Nuevo pedido creado con los mismos detalles:', response);
      // Puedes hacer algo con el nuevo pedido, como mostrarlo en la interfaz
    },
    (error) => {
      console.error('Error al crear el nuevo pedido con los mismos detalles:', error);
    }
  );
}




}


