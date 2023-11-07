import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  loading: boolean;
  loadingData: boolean;
  formBasic: FormGroup;
  viewMode: 'new' | 'detail' = 'new';
  id: string;
  isNew: boolean;
  orders: any = {};
  order: any = {};
  listClients: any[] = [];
  listEmployees: any[] = [];
  listProducts: any[] = [];
  productsFormArray: FormArray;
  selected_employee: string;
  selected_client: string;
  selected_payment_type: string;
  order_detail_products: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _ordersService: OrdersService,
    private toastr: ToastrService
  ) {
    this.productsFormArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id_order'];
    this.isNew = !this.id;
    this.setViewMode();
    this.getClients();
    this.getEmployees();
    this.getProducts();
    this.getOrder();
    this.formBasic = this.formBuilder.group({})
    this.formBasic.addControl('products', this.productsFormArray);
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/new')) {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/detail/')) {
      this.viewMode = 'detail';
    }
  }

  getOrder() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/detail/')) {
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
          console.error('Error al obtener el pedido:', error);
          this.loadingData = false; // En caso de error, asegúrate de desactivar la pantalla de carga
        }
      );
    }
  }

  findOrderData(clientId: number, employeeId: number, products: any) {
    console.log(clientId + " " + employeeId + " " + products);

    // Busca el nombre del cliente
    const client = this.listClients.find(client => client.id_client === clientId);
    if (client) {
      this.selected_client = client.name_client;
    }

    // Busca el nombre del empleado
    const employee = this.listEmployees.find(employee => employee.id_employee === employeeId);
    if (employee) {
      this.selected_employee = employee.name_employee;
    }


    if (products.order_detail) {
      this.order_detail_products = products.order_detail;
    } else {
      this.order_detail_products = products;
    }

    if (this.selected_employee === undefined || this.selected_client === undefined) {
      this.loadingData = true;
      location.reload();
    }

    console.log(this.selected_client);
    console.log(this.selected_employee);
    console.log(this.order_detail_products);
  }

  getClients() {
    this._ordersService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        console.log(this.listClients);
      },
      (error) => {
        console.error('Error al obtener Clientes:', error);
      }
    );
  }

  getEmployees() {
    this._ordersService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
        console.log(this.listEmployees);
      },
      (error) => {
        console.error('Error al obtener Empleados:', error);
      }
    );
  }

  getProducts() {
    this._ordersService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
      },
      (error) => {
        console.error('Error al obtener Productos:', error);
      }
    );
  }

  getProductPrice(idProduct: number): number | undefined {
    const product = this.listProducts.find((p) => p.id_product === idProduct);
    return product ? product.unitPrice : undefined;
  }

  // Función para crear un FormGroup para un producto
  createProductGroup(): FormGroup {
    return this.formBuilder.group({
      id_product: [''],
      unitPrice: [''],
      unit: [''],
      subtotal: [''],
    });
  }

  handleProductSelection(event: any, i: number) {
    const selectedProductId = this.productsFormArray.at(i).get('id_product').value;

    const selectedProduct = this.listProducts.find(product => product.id_product == selectedProductId);
    if (selectedProduct) {

      this.productsFormArray.at(i).get('unitPrice').setValue(selectedProduct.selling_price);

      // Obtén el valor del campo "unit"
      const unitValue = this.productsFormArray.at(i).get('unit').value;
        
      // Calcula el subtotal en función de la cantidad y el precio unitario
      const subtotal = selectedProduct.selling_price * unitValue;
      
      // Asigna el subtotal al campo "subtotal" del formulario
      this.productsFormArray.at(i).get('subtotal').setValue(subtotal);
    } else {
      console.log('Producto no encontrado.');
      this.productsFormArray.at(i).get('unitPrice').setValue(null);
    }
  }

  // Función para agregar un nuevo producto al FormArray
  addProduct() {
    const productGroup = this.createProductGroup();
    this.productsFormArray.push(productGroup);
  }

  // Función para eliminar un producto del FormArray
  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.productsFormArray.length; i++) {
      const subtotal = this.productsFormArray.at(i).get('subtotal').value;
      if (subtotal) {
        total += subtotal;
      }
    }
    return total;
  }

  createOrder() {
    // Implementa la lógica para crear un pedido
  }
}
