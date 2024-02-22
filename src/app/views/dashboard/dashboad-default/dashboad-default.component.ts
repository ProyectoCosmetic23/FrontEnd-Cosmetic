import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EChartsOption } from "echarts";
import { echartStyles } from "../../../shared/echart-styles";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/interfaces";
import { ReportService } from "src/app/shared/services/reports.service";
import { map } from "rxjs/operators";
import { verify } from "crypto";
import { FormBuilder, FormControl, FormGroup, FormsModule } from "@angular/forms";

@Component({
  selector: "app-dashboad-default",
  templateUrl: "./dashboad-default.component.html",
  styleUrls: ["./dashboad-default.component.css"],
})
export class DashboadDefaultComponent implements OnInit {
  @ViewChild('changeStatusModal') changeStatusModal: ElementRef;
  chartLineOption1: EChartsOption;
  chartLineOption2: EChartsOption;
  chartLineOption3: EChartsOption;
  salesChartBar: EChartsOption;
  employeesChartBar: EChartsOption;
  salesChartPie: EChartsOption;
  prediccionChartPie: EChartsOption;
  year_data: 0;
  top_productForm: FormGroup;
  total_number_orders: number = 0;
  total_number_purchases: number = 0;
  total_debts: number = 0;
  total_paid: number = 0;
  user: User | null;
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ];

  
  startYear = 2024;
  endYear = 2025;
  years = Array.from({ length: this.endYear - this.startYear + 1 }, (_, index) => this.startYear + index);
 // Puedes establecer el año inicial según tus necesidades
  isChecked: boolean = false;
  selectedMonth: number 
  ;
  selectedYear: number = this.startYear;
  dialog: any;

  selectedMonth2: string ;
 

  constructor(
    private authService: AuthService,
    private reportService: ReportService) { }
  private fb: FormBuilder;


  
      ngOnInit() {
        const currentMonth = new Date().getMonth() + 1;

    // Establece el mes actual como valor predeterminado
    this.selectedMonth = currentMonth;

     // Llama a las funciones para cargar los datos iniciales
  this.getReportProducts();
  this.getReportCreditSales();
  this.getReportCards();
  this.getReportEmployees();
  this.getReportProductsPrediccion();

}



onCheckboxChange(event: any) {
  this.isChecked = event.target.checked;
  // Asegúrate de tener algún lugar donde obtienes el valor del año (podría ser otro elemento select)
  // this.selectedYear = ...; // Asigna el valor del año adecuado aquí
  console.log('Checkbox state changed. isChecked:', this.isChecked);
  // Resto del código...
  this.getReportProducts();
  this.getReportCreditSales();
  this.getReportCards();
  this.getReportEmployees();
  this.getReportProductsPrediccion();
}


onMonthChangeYear(event: any) {
  this.selectedYear = event.target.value;
  // Asegúrate de tener algún lugar donde obtienes el valor del año (podría ser otro elemento select)
  // this.selectedYear = ...; // Asigna el valor del año adecuado aquí
  console.log("Año seleccionado:", this.selectedYear);
  // Resto del código...
  this.getReportProducts();
  this.getReportCreditSales();
  this.getReportCards();
  this.getReportEmployees();
  this.getReportProductsPrediccion();
}

onMonthChangeMonth(event: any) {
  this.selectedMonth = event.target.value;
  this.selectedMonth2 = event.target.value;
  
  // Asegúrate de tener algún lugar donde obtienes el valor del año (podría ser otro elemento select)
  // this.selectedYear = ...; // Asigna el valor del año adecuado aquí
  console.log("Mes seleccionado:", this.selectedMonth);
  // Resto del código...
  this.getReportProducts();
  this.getReportCreditSales();
  this.getReportCards();
  this.getReportEmployees();
  this.getReportProductsPrediccion();
}

onMonthChangeMonth2(event: any) {
  this.selectedMonth2 = event.target.value;
  
  // Asegúrate de tener algún lugar donde obtienes el valor del año (podría ser otro elemento select)
  // this.selectedYear = ...; // Asigna el valor del año adecuado aquí
  console.log("Mes seleccionado:", this.selectedMonth2);


this.getReportProductsPrediccion();
  
}


getReportCards() {

  this.reportService.getReportCards(this.isChecked, this.selectedYear, this.selectedMonth).subscribe({
    next: (response: any) => {

      this.total_number_orders = response[0].total_number_orders;
      this.total_number_purchases = response[0].total_number_purchases;
      this.total_debts = response[0].total_debts;
      this.total_paid = response[0].total_paid;
    },
    error: (err) => {
      console.log('err', err);
    },
    complete: () => {
    },
  });

}




getReportCreditSales() {

  this.reportService.getReportSales(this.selectedYear).subscribe({
    next: (response: any) => {
      const totalOrderFinalArrayCredit = response.resultCredit.map(item => Number(item.total_order_final));
      const totalOrderFinalArrayCounted = response.resultCounted.map(item => Number(item.total_order_final));
      this.buildReportCreditSalesChartBar(totalOrderFinalArrayCredit, totalOrderFinalArrayCounted, this.getMonths(null));
    },
    error: (err) => {
      console.log('err', err);
    },
    complete: () => {
    },
  });

}

buildReportCreditSalesChartBar(dataCredits: any, dataCounted: any, months: any) {

  // this.chartLineOption3.xAxis = [{data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}];

  const maxValue1 = Math.max(...dataCredits);
  const maxValue2 = Math.max(...dataCounted);
  this.salesChartBar = {
    legend: {
      borderRadius: 0,
      orient: "horizontal",
      // x: 'right',
      data: ["Crédito", "Contado"],
    },
    grid: {
      left: "8px",
      right: "8px",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
      textStyle: {
        color: "white",
      },
    },
    xAxis: [
      {
        type: "category",
        data: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sept",
          "Oct",
          "Nov",
          "Dic",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "${value}",
        },
        min: 0,
        max: maxValue1 > maxValue2 ? maxValue1 : maxValue2,
        interval: 2000000,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: "auto",
        },
      },
    ],

    series: [
      {
        name: "Crédito",
        data: dataCredits,
        label: { show: false, color: "#0168c1" },
        type: "bar",
        barGap: 0,
        color: "#bcbbdd",
        // smooth: true,
      },
      {
        name: "Contado",
        data: dataCounted,
        label: { show: false, color: "#639" },
        type: "bar",
        color: "#7569b3",
        // smooth: true
      },
    ],
  };
}

getReportProducts() {
  this.reportService.getReportProducts(this.isChecked, this.selectedYear, this.selectedMonth).subscribe({
    next: (response: any) => {
      let data = response.map((datos) => {
        return {
          value: datos.order_detail_count,
          name: datos.name_product,
          // Agrega o modifica propiedades según sea necesario
        };
      })

      this.buildReportProductsChartPie(data);
    },
    error: (err) => {
      console.log('err', err);
    },
    complete: () => {
    },
  });

}

buildReportProductsChartPie(data: any) {

  this.salesChartPie = {
    color: ["#62549c", "#7566b5", "#7d6cbb", "#8877bd", "#9181bd", "#6957af"],
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
      textStyle: {
        color: "white",
      },
    },

    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "Productos más vendidos",
        type: "pie",
        radius: "75%",
        center: ["50%", "50%"],
        data: data,
        label: {
          formatter: '{b}: {@[' + "" + ']} ({d}%)'
        },
        itemStyle: {
          // emphasis: {
          //     shadowBlur: 10,
          //     shadowOffsetX: 0,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)'
          // }
        },
      },
    ],
  };
}

getReportEmployees() {
  this.reportService.getReportEmployees(this.isChecked, this.selectedYear, this.selectedMonth).subscribe({
    next: (response: any) => {
      const totalFinalArrayName = response.map(item => item.name);
      const totalFinalArrayValue = response.map(item => item.total_sales);
      const totalFinalArrayValueCommision = response.map(item => item.total_commission);
      this.buildReportEmployeesChartBar(totalFinalArrayName, totalFinalArrayValue,totalFinalArrayValueCommision);
    },
    error: (err) => {
      console.log('err', err);
    },
    complete: () => {
    },
  });

}

getMonths(month) {
  let finalsMonth = [];
  let months: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ]

  if (month != null) {
    finalsMonth = [months[month - 1]]
  } else {
    finalsMonth = months;
  }

  return finalsMonth;
}



buildReportEmployeesChartBar(dataNames: any, dataValues: any, dataCommissions: any) {
  // Obtén el valor máximo para establecer el rango del eje y
  const maxValue = Math.max(...dataValues, ...dataCommissions);

  this.employeesChartBar = {
    legend: {
      borderRadius: 0,
      orient: "horizontal",
      data: ["Total Ventas", "Comisiones"],
    },
    grid: {
      left: "18px",
      right: "94px",
      bottom: "1px",
      containLabel: true,
    },
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
      textStyle: {
        color: "white",
      },
      formatter: function(params) {
        const value = parseFloat(params.value); // Convertir a número
        if (isNaN(value)) {
          return; // Si no es un número válido, devuelve vacío
        }
        let formattedValue = '$' + Math.floor(value).toLocaleString(); // Convertir a entero y formatear con separadores de mil
        return `${params.seriesName}: ${params.name} - ${formattedValue}`;
      }
    },
    
    
    
    xAxis: [
      {
        type: "value",
        name: "",
        interval: 0,
        max: maxValue,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        data: dataNames,
        axisLabel: {
          formatter: (value: any) => {
            return value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' }).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          },
        },
        min: 0,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: "auto",
        },
      },
    ],
    
    series: [
      {
        name: "Total Ventas",
        data: dataValues,
        type: "bar",
        barGap: 0,
        color: "#bcbbdd",
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => { // Formato del texto en la etiqueta
            return "$ " + params.value.toLocaleString('es-ES');
          },
          valueAnimation: true,
          color: "#0168c1",
        },
      },
      {
        name: "Comisiones",
        data: dataCommissions,
        type: "bar",
        barGap: 0,
        color: "#639",
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => { // Formato del texto en la etiqueta
            return "$ " + params.value.toLocaleString('es-ES');
          },
          valueAnimation: true,
          color: "#0168c1",
        },
      },
    ],
  };
}


getReportProductsPrediccion() {
  
  this.reportService.getPredictions().subscribe({
    next: (response: any) => {
      const months = Object.keys(response);
      const selectedMonth = this.selectedMonth2 || '1_2024';
      const topProducts = response[selectedMonth].top_products;
      const data = Object.keys(topProducts).map(productName => {
        return {
          value: topProducts[productName],
          name: productName,
        };
      });

      this.buildReportPrediccionChartPie(data, selectedMonth);
      
    }
  });
}


buildReportPrediccionChartPie(data: any , selectedMonth: string ) {
  this.prediccionChartPie = {
    color: ["#62549c", "#7566b5", "#7d6cbb", "#8877bd", "#9181bd", "#6957af"],
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
      textStyle: {
        color: "white",
      },
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Productos',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{b} : {c} ({d}%)',
        },
      },
    ],
  };
}
}