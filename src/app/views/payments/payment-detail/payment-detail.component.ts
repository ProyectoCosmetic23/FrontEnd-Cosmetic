import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'src/app/shared/services/payment.service';
import { ToastrService } from 'ngx-toastr';

interface Payment {
  id_sale: number;
  id_client: number;
  total_payment: number;
  payment_date: string;
  total_remaining: number;
}

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})

export class PaymentsDetailComponent implements OnInit {
  clientPayments: any[] = [];
  listClients: any[];
  listSales: any[];
  loading: boolean;
  formBasic: FormGroup;
  viewMode: 'new' | 'edit' | 'print' = 'new';
  id_client: string;
  id: string;
  isNew: boolean;
  clientName: string;
  payment: Payment = {
    id_sale: null,
    id_client: null,
    total_payment: null,
    payment_date: '',
    total_remaining: null,
  };
  new_payment = {
    id_sale: null,
    id_client: null,
    total_payment: null,
    payment_date: '',
    total_remaining: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _paymentsService: PaymentsService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    const clientIdString = this.route.snapshot.paramMap.get('id_client');
    const clientId = Number(clientIdString);
    console.log(clientId);
    this._paymentsService.getPayClient(clientId).subscribe(
      (data) => {
        this.payment = data;
      },
      (error) => {
        console.error('Error al obtener los pagos del cliente:', error);
      }
    );
    this.id_client = this.route.snapshot.params['id_client'];

    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildPaymentsForm(this.payment);
    this.setViewMode();
    this.getPayment();
    if (!this.isNew) {
      this.getPayment();
    }
    this.loadClients();
    this.loadSales();
    this.loadClientPayments();
    this.getClientName(clientId);
  }

  getClientName(clientId: number) {
    const client = this.listClients.find(client => client.id_client === clientId);
    this.clientName = client ? client.name_client : '';
  }

  loadClientPayments() {
    const clientIdString = this.route.snapshot.paramMap.get('id_client');
    const clientId = Number(clientIdString);

    this._paymentsService.getPayClient(clientId).subscribe(
      (data) => {
        this.clientPayments = data;
      },
      (error) => {
        console.error('Error al obtener los pagos del cliente:', error);
      }
    );

  }
  getPayment() {
    this.id = this.route.snapshot.params['id_payment'];
    console.log(this.id);

    const paymentID = parseInt(this.id, 10); // Convierte this.id a un número

    if (isNaN(paymentID)) {
      console.error('ID no válido');
      return;
    }

    this._paymentsService.getPaymentById(paymentID).subscribe(
      (data) => {
        this.payment = data;
        console.log(this.payment);
      },
      (error) => {
        console.error('Error al obtener el pago:', error);
      }
    );
  }

  updatedFields: any = {};

  buildPaymentsForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      id: [i.id_payment],
      id_sale: [i.id_sale],
      id_client: [i.id_client],
      total_payment: [i.total_payment],
      payment_date: [i.payment_date],
      total_remaining: [i.total_remaining],
      total_sale: [i.total_sale]
    });
  }
  setViewMode() {

    const currentRoute = this.router.url;

    if (currentRoute.includes('/registrar')) {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/detalle/')) {
      this.viewMode = 'print';
    }
    console.log('viewMode:', this.viewMode);
  }

  loadClients() {
    this._paymentsService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        const clientIdString = this.route.snapshot.paramMap.get('id_client');
        const clientId = Number(clientIdString);
        this.getClientName(clientId);
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }
  
  updateTotalSale() {
    console.log(this.listClients)
    let selectedId = this.formBasic.get('id_sale')?.value;
    selectedId = Number(selectedId);
    const selectedSale = this.listSales.find((sale) => sale.id_sale === selectedId);
    if (selectedSale) {
      this.formBasic.get('total_sale')?.setValue(selectedSale.total_sale);
    } else {
      this.formBasic.get('total_sale')?.setValue(0);
    }
  }
  loadSales() {
    this._paymentsService.getAllSales().subscribe(
      (data) => {
        this.listSales = data;
      },
      (error) => {
        console.error('Error al obtener la lista de ventas:', error);
      }
    );
  }
  handleIdClientSelection(event: any) {
    this.new_payment.id_client = event.target.value;
  }
  handleIdSaleSelection(event: any) {
    this.new_payment.id_sale = event.target.value;
  }
  handlePayDaySelection(event: any) {
    this.new_payment.payment_date = event.target.value;
  }
  handleTotalPaySelection(event: any) {
    this.new_payment.total_payment = event.target.value;
  }
  handleTotalRemainSelection(event: any) {
    this.new_payment.total_remaining = event.target.value;
  }

  createPayment() {
    const currentRoute = this.router.url;
    console.log(currentRoute);

    if (currentRoute.includes('/registrar')) {
      console.log(this.new_payment);

      this._paymentsService.createPayment(this.new_payment).subscribe(
        (data) => {
          console.log(data);
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.toastr.success('Pago creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
            setTimeout(() => {
              this.router.navigate(['/pagos']);
            }, 3000);
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Fallo al crear el pago.', 'Error', { progressBar: true });
          console.error('Error al crear el pago:', error);
        }
      );
    }
    this.loading = true;
  }

  submit() {
    if (this.viewMode === 'new') {
      this.createPayment(); // Lógica de creación
    }
  }
  
}

