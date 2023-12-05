import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrdersService } from "src/app/shared/services/orders.service";
import { PaymentsService } from "src/app/shared/services/payment.service";
import { NgSelectConfig } from "@ng-select/ng-select";

@Component({
  selector: "app-orders-detail",
  templateUrl: "./orders-detail.component.html",
  styleUrls: ["./orders-detail.component.scss"],
})
export class OrdersDetailComponent implements OnInit {
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
  listPayments: any[] = [];
  showLoadingScreen: boolean = false;
  directSale: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService,
    private _paymentService: PaymentsService,
    private toastr: ToastrService,
    private ngSelectConfig: NgSelectConfig
  ) {
    this.ngSelectConfig.notFoundText = "No se encontraron resultados";
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
    this.formBasic = this.formBuilder.group({
      directSale: false,
    });
    this.formBasic.addControl("products", this.productsFormArray);
    this.getPaymentsForOrder();
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

  getPaymentsForOrder() {
    if (this.viewMode === "detail") {
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
          console.error("Error al obtener pagos:", error);
        }
      );
    }
  }
  // Método para obtener un pedido y sus detalles
  getOrder() {
    this.showLoadingScreen = true;
    const currentRoute = this.router.url;
    if (currentRoute.includes("/detail/")) {
      // Antes de cargar los datos, establece loadingData en true
      this._ordersService.getOrderById(this.id).subscribe(
        (data) => {
          this.order = data;
          const idClient = this.order.order.id_client;
          const idEmployee = this.order.order.id_employee;
          const orderDetail = this.order.order_detail;

          this.selected_payment_type = this.order.order.payment_type;

          this.showLoadingScreen = true;

          this.findOrderData(idClient, idEmployee, orderDetail);

          // Después de cargar los datos, establece loadingData en false
          this.showLoadingScreen = false;
          console.log(this.order);
        },
        (error) => {
          console.error("Error al obtener el pedido:", error);
          this.showLoadingScreen = false;
        }
      );
    }
  }

  // Método para encontrar información relacionada con el pedido (cliente, empleado, productos)
  async findOrderData(clientId: number, employeeId: number, products: any) {
    this.showLoadingScreen = true;

    // Función para verificar si todos los datos están cargados
    const checkDataLoaded = () => {
      return (
        this.selected_client !== undefined &&
        this.selected_employee !== undefined &&
        !retry
      );
    };

    let retry = false;

    do {
      // Función para cargar los datos del cliente
      const loadClientData = async () => {
        const client = this.listClients.find(
          (client) => client.id_client === clientId
        );
        if (client) {
          this.selected_client = client.name_client;
        }
      };

      // Función para cargar los datos del empleado
      const loadEmployeeData = async () => {
        const employee = this.listEmployees.find(
          (employee) => employee.id_employee === employeeId
        );
        if (employee) {
          this.selected_employee = employee.name_employee;
        }
      };

      // Función para cargar los datos de los productos
      const loadProductData = async () => {
        this.order_detail_products = await Promise.all(
          products.map(async (detail) => {
            let product_name;
            let product = this.listProducts.find(
              (product) => product.id_product === detail.id_product
            );
            if (product) {
              product_name = product.name_product;
            }
            let product_subtotal =
              detail.product_price * detail.product_quantity;

            return {
              id_order: 1,
              id_order_detail: 1,
              id_product: detail.id_product,
              product_name: product_name,
              product_price: detail.product_price,
              product_quantity: detail.product_quantity,
              product_subtotal: product_subtotal,
            };
          })
        );

        // Validación de nombres de productos
        if (
          this.order_detail_products.some(
            (product) => product.product_name === undefined
          )
        ) {
          console.log(
            "Error: No se cargaron todos los nombres de productos correctamente. Reintentando..."
          );
          retry = true;
        } else {
          retry = false;
        }
      };

      // Cargar datos de forma asíncrona
      await Promise.all([
        loadClientData(),
        loadEmployeeData(),
        loadProductData(),
      ]);

      // Puedes agregar un pequeño retraso antes de la próxima iteración
      await this.delay(100);
    } while (!checkDataLoaded());

    this.showLoadingScreen = false;
  }

  // Función para introducir un retraso (promesa)
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Método para obtener todos los clientes
  getClients() {
    this._ordersService.getAllClients().subscribe(
      (data) => {
        this.listClients = data.filter(
          (client) => client.state_client === "Activo"
        );
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
        this.listEmployees = data.filter(
          (employee) => employee.state_employee === "Activo"
        );
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
        // Inicializa la propiedad isDisabled en false para cada producto
        this.listProducts = data.map((product) => ({
          ...product,
          disabled: false,
        }));
        this.listProducts = this.listProducts.filter(
          (product) => product.state_product === "Activo"
        );
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

  onClientSelected(selectedClient: any): void {
    // Accede al ID del cliente seleccionado
    const selectedClientId = selectedClient ? selectedClient.id_client : null;

    this.selected_client_id = selectedClientId;
    // Verifica si el ID es nulo, indefinido o vacío
    if (!this.selected_client_id) {
      this.error_client = true;
    } else {
      this.error_client = false;
    }
  }

  onEmployeeSelected(selectedEmployee: any): void {
    // Accede al ID del empleado seleccionado
    this.selected_employee_id = selectedEmployee
      ? selectedEmployee.id_employee
      : null;

    // Verifica si el ID es nulo, indefinido o vacío
    if (!this.selected_employee_id) {
      this.error_employee = true;
    } else {
      this.error_employee = false;
    }
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
  }

  // -------------- INICIO: Funciones para manipular Productos -------------- //

  // Método para crear un FormGroup para un producto
  createProductGroup(): FormGroup {
    return this.formBuilder.group({
      id_product: [""],
      product_price: [""],
      product_quantity: [""],
      subtotal: [""],
      quantityOnhand: [""],
    });
  }

  // Método para manejar la selección de un producto
  handleProductSelection(event: any, i: number) {
    const selectedProductId = this.productsFormArray
      .at(i)
      .get("id_product").value;

    // Obtén el producto previamente seleccionado
    const previouslySelectedProductId =
      this.productsFormArray.value[i].id_product;
    const previouslySelectedProductIndex = this.listProducts.findIndex(
      (product) => product.id_product === previouslySelectedProductId
    );

    // Si había un producto previamente seleccionado, cambia su estado a false
    if (previouslySelectedProductIndex !== -1) {
      this.listProducts[previouslySelectedProductIndex].disabled = false;
    }

    const selectedProductIndex = this.listProducts.findIndex(
      (product) => product.id_product === selectedProductId
    );

    const selectedProduct = this.listProducts[selectedProductIndex];

    if (selectedProductIndex !== -1) {
      this.productsFormArray
        .at(i)
        .get("product_price")
        .setValue(selectedProduct.selling_price);

      const unitValue = this.productsFormArray
        .at(i)
        .get("product_quantity").value;

      if (unitValue != null && unitValue !== undefined) {
        const subtotal = selectedProduct.selling_price * unitValue;

        this.productsFormArray
          .at(i)
          .get("quantityOnhand")
          .setValue(selectedProduct.quantity);
        this.productsFormArray.at(i).get("subtotal").setValue(subtotal);

        // Cambia la propiedad isDisabled a true para el nuevo producto seleccionado
        this.listProducts[selectedProductIndex].disabled = true;
      } else {
        console.log("La cantidad del producto no está definida.");
      }
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
  }

  // Función para eliminar un producto del FormArray
  removeProduct(index: number) {
    // Obtén el id_product del producto que se va a eliminar
    const productIdToRemove = this.productsFormArray
      .at(index)
      .get("id_product").value;

    // Encuentra el producto en listProducts
    const productIndexToRemove = this.listProducts.findIndex(
      (product) => product.id_product == productIdToRemove
    );

    // Cambia el estado isDisabled a false
    if (productIndexToRemove !== -1) {
      this.listProducts[productIndexToRemove].disabled = false;
    }

    console.log(this.listProducts[productIndexToRemove]);

    // Elimina el producto del FormArray
    this.productsFormArray.removeAt(index);

    // Actualiza la cantidad de productos
    this.numberOfProducts = Object.keys(this.productsFormArray.controls).length;
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.productsFormArray.length; i++) {
      const subtotal = this.productsFormArray.at(i).get("subtotal").value;
      if (subtotal) {
        total += subtotal;
      }
    }
    return total;
  }

  selectConfig = {
    displayKey: "name",
    search: true,
    placeholder: "Selecciona un producto",
  };

  // -------------- INICIO: Métodos para crear un nuevo Pedido -------------- //

  createOrder() {
    try {
      if (!this.formBasic.valid) {
        this.showFormWarning("Completa el formulario correctamente");
        return;
      }

      // Llamada a checkProducts antes de realizar la solicitud
      if (this.checkConditions() && this.checkProducts()) {
        const productsArray = this.productsFormArray.value;
        const productQuantityMap = new Map();

        for (const product of productsArray) {
          const idProduct = product.id_product;

          if (productQuantityMap.has(idProduct)) {
            productQuantityMap.set(
              idProduct,
              productQuantityMap.get(idProduct) + product.product_quantity
            );
          } else {
            productQuantityMap.set(idProduct, product.product_quantity);
          }
        }

        const uniqueProducts = productsArray.filter((product) => {
          const idProduct = product.id_product;
          if (productQuantityMap.has(idProduct)) {
            product.product_quantity = productQuantityMap.get(idProduct);
            productQuantityMap.delete(idProduct);
            return true;
          }
          return false;
        });

        const products = uniqueProducts;

        const order_date = new Date();
        const total_order = this.calculateTotal();

        const newOrder = {
          id_client: this.selected_client_id,
          id_employee: this.selected_employee_id,
          order_date: order_date,
          payment_type: this.selected_payment_type,
          total_order: total_order,
          products: products,
          directSale: this.directSale,
        };

        this.submitOrder(newOrder);
      }
      // Si alguna de las condiciones no se cumple, la ejecución no llegará aquí
    } catch (error) {
      // Manejar el error, puedes agregar lógica adicional si es necesario
      console.error(error);
    }
  }

  checkProducts(): boolean {
    let allConditionsMet = true;

    if (this.productsFormArray.length === 0) {
      this.showFormWarning("Agrega al menos un producto al pedido");
      allConditionsMet = false;
    }

    const productsArray = this.productsFormArray.value;
    for (const product of productsArray) {
      if (
        !product.id_product ||
        !product.product_price ||
        !product.product_quantity
      ) {
        this.showFormWarning("Completa todos los campos del producto");
        allConditionsMet = false;
      }

      // Encuentra el producto en listProducts por id_product
      const selectedProduct = this.listProducts.find(
        (p) => p.id_product === product.id_product
      );

      if (
        selectedProduct &&
        product.product_quantity > selectedProduct.quantity
      ) {
        // Si la cantidad en productsFormArray es mayor que la cantidad disponible en listProducts, muestra una advertencia
        this.showFormWarning(
          "La cantidad de productos supera el stock disponible"
        );
        allConditionsMet = false;
      }
    }

    return allConditionsMet;
  }

  checkConditions(): boolean {
    const conditions = [
      {
        variable: "error_client",
        condition:
          this.selected_client === "Seleccione el nombre del cliente" ||
          this.selected_client_id == null ||
          this.selected_client_id == undefined,
        errorMessage: "Seleccione un cliente. ",
      },
      {
        variable: "error_employee",
        condition:
          this.selected_employee === "Seleccione el nombre del empleado" ||
          this.selected_employee_id == null ||
          this.selected_employee_id == undefined,
        errorMessage: "Seleccione un empleado. ",
      },
      {
        variable: "error_payment_type",
        condition:
          this.selected_payment_type === "Seleccione el tipo de pago" ||
          this.selected_payment_type == null ||
          this.selected_payment_type == undefined,
        errorMessage: "Seleccione un tipo de pago. ",
      },
    ];

    let allConditionsMet = true;
    const errorMessages = [];

    conditions.forEach((condition) => {
      this[condition.variable] =
        this[condition.variable] || condition.condition;

      if (this[condition.variable]) {
        allConditionsMet = false;
      }
    });

    if (!allConditionsMet) {
      throw new Error("Algunas condiciones no se cumplieron");
    }

    return allConditionsMet;
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
