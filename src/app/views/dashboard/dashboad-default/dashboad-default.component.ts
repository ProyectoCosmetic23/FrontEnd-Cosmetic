import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import { echartStyles } from "../../../shared/echart-styles";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/interfaces";
import { ReportService } from "src/app/shared/services/reports.service";
import { map } from "rxjs/operators";
import { verify } from "crypto";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboad-default",
  templateUrl: "./dashboad-default.component.html",
  styleUrls: ["./dashboad-default.component.css"],
})
export class DashboadDefaultComponent implements OnInit {
  chartLineOption1: EChartsOption;
  chartLineOption2: EChartsOption;
  chartLineOption3: EChartsOption;
  salesChartBar: EChartsOption;
  employeesChartBar: EChartsOption;
  salesChartPie: EChartsOption;
  year_data: 0;
  top_productForm: FormGroup;
  total_number_orders: number = 0;
  total_number_purchases: number = 0;
  total_debts: number = 0;
  total_paid: number = 0;

  user: User | null;

  constructor(
    private authService: AuthService,
    private reportService: ReportService) { }
  private formData: FormBuilder;

  ngOnInit() {
    this.getReportProducts();
    this.getReportCreditSales();
    this.getReportCards();
    this.getReportEmployees();
  }

  getReportCards() {
    this.reportService.getReportCards(true, 2023, 0).subscribe({
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
 this.reportService.getReportSales(2023).subscribe({
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
        data: ["Credito", "Contado"],
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
          name: "Credito",
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
    this.reportService.getReportProducts(true, 2023, 0).subscribe({
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
          name: "Productos mas vendidos",
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
    this.reportService.getReportEmployees(true, 2023, 0).subscribe({
      next: (response: any) => {
        const totalFinalArrayName = response.map(item => item.name);
        const totalFinalArrayValue = response.map(item => item.total);
        this.buildReportEmployeesChartBar(totalFinalArrayName, totalFinalArrayValue);
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


  buildReportEmployeesChartBar(dataNames: any, dataValues: any) {

    // this.chartLineOption3.xAxis = [{data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}];

    const maxValue = Math.max(...dataValues);
    this.employeesChartBar = {
      legend: {
        borderRadius: 0,
        orient: "horizontal",
        // x: 'right',
        data: ["Empleados"],
      },
      grid: {
        left: "15px",
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
      },
      xAxis: [
        {
          type: "value",
          name: "",
          interval:0,
          // axisTick: {
          //   alignWithLabel: true,
          // },
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
          name: "Empleados",
          data: dataValues,
          type: "bar",
          barGap: 0,
          color: "#bcbbdd",
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
            color: "#0168c1"
          }
          // smooth: true,
        }
      ],
    };
  };
}

