import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ReturnsService } from "src/app/shared/services/returns.service";
import { OrdersService } from "src/app/shared/services/orders.service";
import { CookieService } from "ngx-cookie-service";
import { PaymentsService } from "src/app/shared/services/payment.service";
import Swal from "sweetalert2";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "src/app/shared/services/product.service";

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
  returnedProductsFormArray: FormArray;

  // Propiedades para el modo de vista
  viewMode: "detaild" = "detaild";

  // Otras propiedades
  id: string;
  orders: any = {};
  orderTotal: any;
  order: any = {};
  listClients: any[] = [];
  listEmployees: any[] = [];
  listProducts: any[] = [];
  order_detail_products: any[] = [];
  order_return_products: any[] = [];
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
  modalRef: NgbModalRef | undefined;
  selectedProductId: number;
  selectedProductValue: number;
  returnQuantity: number = 0;
  calculatedValue: number = 0;
  returnReason: string = "";
  returnValue: number;
  productQuantity: number;

  filteredProducts: any[];

  wishToRetire: boolean = false;
  max_quantity: number;
  quantityError: any;
  reasonError: boolean;
  lengthError: boolean;
  staticTotalOrder: any;
  asociatedPayments: any;

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
    this.returnedProductsFormArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id_order"];
    this.isNew = !this.id;
    this.setViewMode();
    this.getClients();
    this.getEmployees();
    this.getProducts();
    this.getOrder();
    this.formBasic = this.formBuilder.group({});
    this.formBasic.addControl("products", this.productsFormArray);
    this.formBasic.addControl("returnedProducts", this.productsFormArray);
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
    if (this.viewMode === "detaild") {
      const orderId = parseInt(this.id, 10);

      this._paymentService.getPayOrder(orderId).subscribe(
        (payments) => {
          // Puedes almacenar los pagos en una propiedad del componente
          this.listPayments = payments;
        },
        (error) => {
          console.error("Error al obtener pagos:", error);
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
          });
          this.selected_payment_type = this.order.order.payment_type;

          this.findOrderData(idClient, idEmployee, orderDetail);

          this.staticTotalOrder = this.order.order.total_order;

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

  // -------------- INICIO: Funciones para manipular Productos -------------- //

  createReturn(): FormGroup {
    console.log(this.productsFormArray.value);
    return this.formBuilder.group({
      id_product: [""],
      product_quantity: [""],
      product_name: [""],
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

  openRetireModal(
    productId: number,
    productQuantity: number,
    productValue: number,
    content: any
  ): void {
    this.selectedProductId = productId;
    this.max_quantity = productQuantity;
    this.returnReason = "";

    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      backdrop: "static",
    });
  }

  limitMaxValue(event: any): void {
    const inputElement = event.target;
    const inputValue = parseInt(inputElement.value, 10);
    const max =
      this.max_quantity !== undefined
        ? this.max_quantity
        : Number.MAX_SAFE_INTEGER;

    if (event.key === "e" || event.key === "E") {
      event.preventDefault();
      return;
    }

    if (isNaN(inputValue) && event.inputType !== "deleteContentBackward") {
      inputElement.value = String(max);
      this.returnQuantity = this.max_quantity;
      this.productQuantity = this.max_quantity;
    }

    if (inputValue > max) {
      inputElement.value = String(max);
      this.returnQuantity = this.max_quantity;
      this.productQuantity = this.max_quantity;
    }

    if (inputValue < 0) {
      inputElement.value = String(0);
      this.returnQuantity = this.max_quantity;
      this.productQuantity = this.max_quantity;
    }
  }

  validateWishToRetire() {
    var wishToRetireString;

    if (this.wishToRetire == true) {
      wishToRetireString = "Dado de Baja";
    } else if (this.wishToRetire == false) {
      wishToRetireString = "Devuelto al Inventario";
    }

    return wishToRetireString;
  }

  updateTotalOrder() {
    // Recorrer todos los productos en order_detail_products y calcular la suma
    let sumProductSubtotal = 0;

    this.order_detail_products.forEach((product) => {
      // Calcular el subtotal del producto
      product.product_subtotal =
        product.product_quantity * product.product_price;
      // Sumar al total
      sumProductSubtotal += product.product_subtotal;
    });

    // Asignar la suma al total_order en la orden
    this.order.order.total_order = sumProductSubtotal;
  }

  removeProductQuantity() {
    const productIndexOrderList = this.order_detail_products.findIndex(
      (product) => product.id_product == this.selectedProductId
    );

    this.order_detail_products[productIndexOrderList].product_quantity -=
      this.productQuantity;

    this.order_detail_products[productIndexOrderList].product_subtotal =
      this.order_detail_products[productIndexOrderList].product_quantity *
      this.order_detail_products[productIndexOrderList].product_price;

    this.updateTotalOrder();
  }

  retireProduct() {
    this.quantityError = !(this.productQuantity > 0);
    this.reasonError = !(this.returnReason && this.returnReason !== "");

    if (!this.quantityError && !this.reasonError) {
      var wishToRetireString = this.validateWishToRetire();

      const selectedProductIndex = this.listProducts.findIndex(
        (product) => product.id_product == this.selectedProductId
      );

      const productIndexFormArray =
        this.returnedProductsFormArray.controls.findIndex(
          (control) => control.value.id_product === this.selectedProductId
        );

      if (productIndexFormArray !== -1) {
        var actualProduct = this.returnedProductsFormArray.at(
          productIndexFormArray
        ).value;
        console.log(actualProduct);
      } else {
        console.log("Producto no encontrado en this.returnedProductsFormArray");
      }

      if (
        productIndexFormArray !== -1 &&
        actualProduct.retire == wishToRetireString
      ) {
        const existingProductControl =
          this.returnedProductsFormArray.controls[productIndexFormArray];
        existingProductControl.patchValue({
          product_quantity:
            existingProductControl.value.product_quantity +
            this.productQuantity,
        });

        this.removeProductQuantity();

        this.closeModal();
      } else {
        if (selectedProductIndex !== -1) {
          const selectedProduct = this.listProducts[selectedProductIndex];

          const { selling_price, name_product } = selectedProduct;

          const returningProduct = {
            id_product: this.selectedProductId,
            product_name: name_product,
            retire: wishToRetireString,
            returnReason: this.returnReason,
            selling_price: selling_price,
            product_quantity: this.productQuantity,
            subtotal: selling_price * this.productQuantity,
          };

          const returningProductForm = this.formBuilder.group({
            id_product: [returningProduct.id_product],
            product_name: [returningProduct.product_name],
            retire: [returningProduct.retire],
            returnReason: [returningProduct.returnReason],
            selling_price: [returningProduct.selling_price],
            product_quantity: [returningProduct.product_quantity],
            subtotal: [returningProduct.subtotal],
          });

          this.removeProductQuantity();

          this.returnedProductsFormArray.push(returningProductForm);

          this.closeModal();
        } else {
          console.error("Producto no encontrado en this.listProducts");
        }
      }
    } else {
      return;
    }
  }

  returnProductToDetail(id_product, product_quantity) {
    const productIndexOrderList = this.order_detail_products.findIndex(
      (product) => product.id_product == id_product
    );

    this.order_detail_products[productIndexOrderList].product_quantity +=
      product_quantity;

    const returnedProductsArray = this.returnedProductsFormArray
      .controls as FormGroup[];

    const productIndexFormArray = returnedProductsArray.findIndex(
      (product) => product.value.id_product == id_product
    );

    this.returnedProductsFormArray.removeAt(productIndexFormArray);

    this.updateTotalOrder();
  }

  closeModal(): void {
    this.productQuantity = null;
    this.returnReason = "";
    this.wishToRetire = false;
    this.modalRef.close();
  }

  updateProductQuantity(productId: number, quantityToSubtract: number): void {
    const productToUpdate = this.listProducts.find(
      (product) => product.id_product === productId
    );

    if (productToUpdate) {
      productToUpdate.product_quantity -= quantityToSubtract;
    }
  }

  //PRODUCTOS
  getProductNameById(productId: number): string {
    const product = this.listProducts.find((p) => p.id_product === productId);
    return product ? product.name_product : "";
  }

  createReplacementOrder() {
    if (this.returnedProductsFormArray.length == 0) {
      this.lengthError = true;
    } else {
      this.lengthError = false;

      let totalSale = 0;
      let products = [];
      const newOrderDate = new Date();

      this.order_detail_products.forEach((product) => {
        if (product.product_quantity > 0) {
          products.push(product);
          totalSale += product.product_subtotal;
        }
      });

      var productsLength = products.length > 0;

      if (products.length > 0 && products.length !== -1) {
        // En caso de que si existan cantidades dentro del Array de productos se crea un nuevo pedido
        // con los productos con cantidad > 0, se anula el pedido actual, y se crean los registros de
        // los productos devueltos en la base de datos.
        const newOrder = {
          id_client: this.order.order.id_client,
          id_employee: this.order.order.id_employee,
          order_date: newOrderDate,
          payment_type: this.order.order.payment_type,
          total_order: totalSale,
          products: products,
          directSale: this.order.order.directSale,
          isReturn: true,
        };

        this._ordersService.createOrder(newOrder).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

        this.anulateOrderWithRefund(productsLength);
      } else {
        // En caso de que no existan cantidades dentro del Array de productos no se crea un nuevo pedido,
        // se anula el pedido actual, y se crean los registros de los productos devueltos en la base de
        // datos.

        this.anulateOrderWithRefund(productsLength);
      }
    }
  }

  anulateOrderWithRefund(productsLength: boolean) {
    var totalPayments = 0;

    if (this.listPayments.length > 0) {
      this.listPayments.forEach((payments) => {
        totalPayments += parseInt(payments.total_payment);
      });
    } else {
      console.log("No existen pagos asociados");
    }

    let amountToRefund = totalPayments - this.order.order.total_order;

    var message;

    if (totalPayments > this.order.order.total_order) {
      // Formatear amountToRefund como moneda
      const formattedAmountToRefund = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP", // Puedes cambiar la moneda según tu necesidad
      }).format(amountToRefund);

      message = productsLength
        ? `Se realizó la devolución de éste pedido, y se creó un nuevo pedido con los productos restantes no devueltos. Se realizó al cliente una devolución de ${amountToRefund} pesos.`
        : `Se realizó la devolución de éste pedido, y se realizó al cliente una devolución de ${amountToRefund} pesos.`;

      // Usar SweetAlert para mostrar la alerta
      Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: `Se debe realizar una devolución de ${formattedAmountToRefund}. `,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Refunded ", amountToRefund);
          this._ordersService
            .AnulateOrder(this.order.order.id_order, {
              observation: message,
              anulationType: true,
            })
            .subscribe(
              (data) => {
                // Manejar la respuesta exitosa aquí
                console.log("La orden fue anulada correctamente", data);
              },
              (error) => {
                // Manejar el error aquí
                console.error("Hubo un error al anular la orden", error);
              }
            );
          this.registerReturns();
        } else {
          this.toastr.warning("La devolución ha sido cancelada", "Cancelado");
        }
      });
    } else {
      message = productsLength
        ? `Se realizó la devolución de éste pedido, y se creó un nuevo pedido con los productos restantes no devueltos.`
        : `Se realizó la devolución de éste pedido`;

      Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: `¿Está seguro de que desea realizar la devolución?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          this._ordersService
            .AnulateOrder(this.order.order.id_order, {
              observation: message,
              anulationType: true,
            })
            .subscribe(
              (data) => {
                // Manejar la respuesta exitosa aquí
                console.log("La orden fue anulada correctamente", data);
              },
              (error) => {
                // Manejar el error aquí
                console.error("Hubo un error al anular la orden", error);
              }
            );
          this.registerReturns();
        } else {
          this.toastr.warning("La devolución ha sido cancelada", "Cancelado");
        }
      });
    }
  }

  registerReturns() {
    const returnedProductsArray = this.returnedProductsFormArray.value;
    var error = false;
    returnedProductsArray.forEach((product) => {
      product.id_order = this.order.order.id_order;
      console.log(product);
      this._returnsService.retireProduct(product).subscribe(
        (response) => {
          console.log("Retiro de producto exitoso:", response);
        },
        (error) => {
          error = true;

          console.error("Error al retirar el producto:", error);
        }
      );
    });
    if (error == false) {
      this.toastr.success("Devolución realizada", "Completado");
      this.router.navigate(["/orders"]);
    } else {
      this.toastr.error("Devolución Fallida", "Error");
    }
  }
}
