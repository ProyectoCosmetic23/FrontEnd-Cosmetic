import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrdersService } from "src/app/shared/services/orders.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-sales-detail",
  templateUrl: "./sales-detail.component.html",
  styleUrls: ["./sales-detail.component.scss"],
})
export class SalesDetailComponent implements OnInit {
  // Propiedades booleanas
  loading: boolean;
  loadingData: boolean;
  isNew: boolean;

  // Propiedades de formulario
  formBasic: FormGroup;
  productsFormArray: FormArray;

  // Propiedades para el modo de vista
  viewMode: "new" | "detail" = "new";

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService,
    private cookieService: CookieService,
    private toastr: ToastrService
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
  }

  // -------------- INICIO: Método para definir el tipo de vista -------------- //

  // Método que determina el modo de vista (nuevo o detalle) según la ruta actual
  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/detail/")) {
      this.viewMode = "detail";
    }
  }

  // -------------- INICIO: Métodos para obtener datos -------------- //

  // Método para obtener un pedido y sus detalles
  getOrder() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/detail/")) {
      // Antes de cargar los datos, establece loadingData en true
      this._ordersService.getOrderById(this.id).subscribe(
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
    this._ordersService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        console.log(this.listClients);
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    );
  }

  // Método para obtener todos los empleados
  getEmployees() {
    this._ordersService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
        console.log(this.listEmployees);
      },
      (error) => {
        console.error("Error al obtener Empleados:", error);
      }
    );
  }

  // Método para obtener todos los productos
  getProducts() {
    this._ordersService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
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
      this.error_employee = true;
    } else {
      this.error_employee = false;
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
      this.error_payment_type = true;
    } else {
      this.error_payment_type = false;
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

    this.submitOrder(newOrder);
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
        this.showFormWarning("Completa todos los campos del producto");
        throw new Error("Campos de producto incompletos");
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
        errorMessage: "Seleccione un cliente",
      },
      {
        variable: "error_employee",
        condition:
          this.selected_employee === "Seleccione el nombre del empleado" ||
          this.selected_employee_id == null ||
          this.selected_employee_id == undefined,
        errorMessage: "Seleccione un empleado",
      },
      {
        variable: "error_payment_type",
        condition:
          this.selected_payment_type === "Seleccione el tipo de pago" ||
          this.selected_payment_type == null ||
          this.selected_payment_type == undefined,
        errorMessage: "Seleccione un tipo de pago",
      },
    ];

    conditions.forEach((condition) => {
      this[condition.variable] =
        this[condition.variable] || condition.condition;

      if (this[condition.variable]) {
        this.showFormWarning(condition.errorMessage);
        throw new Error(`${condition.variable} no seleccionado`);
      }
    });

    // Reset errors if all conditions are false
    if (!conditions.some((condition) => this[condition.variable])) {
      conditions.forEach((condition) => {
        this[condition.variable] = false;
      });
    }
  }

  showFormWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  submitOrder(newOrder) {
    this._ordersService.createOrder(newOrder).subscribe(
      (response) => {
        this.showSuccessMessage("Pedido creado exitosamente");
        this.router.navigate(["/orders"]);
      },
      (error) => {
        this.handleError("Error al crear el pedido:", error);
      }
    );
  }

  showSuccessMessage(message: string) {
    this.toastr.success(message, "Éxito");
  }

  handleError(errorMessage: string, error: any) {
    console.error(errorMessage, error);
    this.toastr.error("Error al crear el pedido", "Error");
  }
}
