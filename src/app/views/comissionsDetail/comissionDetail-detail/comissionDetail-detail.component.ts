import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComissionsDetailService } from 'src/app/shared/services/comission-detail.service';
import { ToastrService } from 'ngx-toastr';


interface ComissionDetail {
  commission_percentage: number;
}

@Component({
  selector: 'app-comissionDetail-detail',
  templateUrl: './comissionDetail-detail.component.html',
  styleUrls: ['./comissionDetail-detail.component.scss']
})

export class ComissionsDetailDetailComponent implements OnInit {
  loading: boolean;
  formBasic: FormGroup;
  viewMode: 'new' | 'print' = 'new';
  id: string;
  isNew: boolean;
  comissionDetail: ComissionDetail = {
    commission_percentage: 0,
  };
  new_comissionDetail = {
    commission_percentage: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _comssionDetailService: ComissionsDetailService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  currentMonthYear: string;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildProvidersForm(this.comissionDetail);
    this.setViewMode();
    this.getComissionDetail();
    const date = new Date();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() starts from 0 for January, so we add 1.
    const year = date.getFullYear();

    this.currentMonthYear = `${month}/${year}`;
    if (!this.isNew) {
      this.getComissionDetail();
    }
  }

  updatedFields: any = {};

  buildProvidersForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      id: [i.id_commission_detail],
      month_commission: [i.month_commission],
      commission_percentage: [i.commission_percentage],
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
  getComissionDetail() {
    this.id = this.route.snapshot.params['id_commission_detail'];
    console.log(this.id);

    const comissionDetailId = parseInt(this.id, 10); // Convierte this.id a un número

    this._comssionDetailService.getDetailComsById(comissionDetailId).subscribe(
      (data) => {
        this.comissionDetail = data;
        console.log(this.comissionDetail);
      },
      (error) => {
        console.error('Error al obtener el detalle de la comisión:', error);
      }
    );
  }
  handlePerccentageSelection(event: any) {
    this.new_comissionDetail.commission_percentage = event.target.value;
  }

  

  createComissionDetail() {
    if (this.viewMode === 'new') {
      const currentRoute = this.router.url;
      console.log(currentRoute);
  
      if (currentRoute.includes('/registrar')) {
        console.log(this.new_comissionDetail);
  
        this._comssionDetailService.createDetailCom(this.new_comissionDetail).subscribe(
          (data) => {
            console.log(data);
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.toastr.success('Detalle comisión creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
              setTimeout(() => {
                this.router.navigate(['/comisiones']);
              }, 3000);
            }, 3000);
          },
          (error) => {
            this.loading = false;
            this.toastr.error('Fallo al crear el detalle comisión.', 'Error', { progressBar: true });
            console.error('Error al crear el detalle comisión:', error);
          }
        );
      }
    }
  }
  submit() {
    if (this.viewMode === 'new') {
      this.createComissionDetail(); // Lógica de creación
    } 
  }
  navigateBack() {
    this.router.navigate(['/comisiones']);
  }
}
