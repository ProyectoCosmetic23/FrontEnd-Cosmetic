import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrdersService } from "src/app/shared/services/orders.service";
import { CookieService } from "ngx-cookie-service";

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
      this.loadingData = true;
      this._ordersService.getOrderById(this.id).subscribe(
        (data) => {
          this.order = data;
          const idClient = this.order.order.id_client;
          const idEmployee = this.order.order.id_employee;
          const orderDetail = this.order.order_detail[0];

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
    console.log(clientId + " " + employeeId + " " + products);

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

    // Asigna el detalle de productos del pedido
    if (products.order_detail) {
      this.order_detail_products = products.order_detail;
    } else {
      this.order_detail_products = products;
    }

    // Si falta información esencial, recarga la página
    if (
      this.selected_employee === undefined ||
      this.selected_client === undefined
    ) {
      this.loadingData = true;
    }

    console.log(this.selected_client);
    console.log(this.selected_employee);
    console.log(this.order_detail_products);
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
    return product ? product.unitPrice : undefined;
  }

  // -------------- INICIO: Funciones para manipular Productos -------------- //

  // Método para crear un FormGroup para un producto
  createProductGroup(): FormGroup {
    return this.formBuilder.group({
      id_product: [""],
      unitPrice: [""],
      unit: [""],
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
        .get("unitPrice")
        .setValue(selectedProduct.selling_price);

      // Obtén el valor del campo "unit"
      const unitValue = this.productsFormArray.at(i).get("unit").value;

      // Calcula el subtotal en función de la cantidad y el precio unitario
      const subtotal = selectedProduct.selling_price * unitValue;

      // Asigna el subtotal al campo "subtotal" del formulario
      this.productsFormArray.at(i).get("subtotal").setValue(subtotal);
    } else {
      console.log("Producto no encontrado.");
      this.productsFormArray.at(i).get("unitPrice").setValue(null);
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
    // Implementa la lógica para crear un pedido
  }
}
