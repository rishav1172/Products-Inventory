import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Product } from '@app/_models';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './top_viewed.component.html'
  // styleUrls: ['./bar-chart.component.scss'],
})
export class top_viewedComponent implements OnInit {
  products: Product[];
  _x: number = 3;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ ticks: {beginAtZero: true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Top Viewed Products'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];
  //   { data: [60], label: 'Series' },
  //   { data: [28], label: 'Series B' },
  //   {data: [60], label: 'Series'}
  // ];

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userservice.getProducts().subscribe(
      products => {
          this.products = products;
          this.products.sort((a, b) => (a.viewed>b.viewed)?1:-1).reverse();

          for (let i=0;i<this.x;i++)
          {
            this.barChartData.push({data: [this.products[i].viewed], label: this.products[i].name});
          }
          this.barChartData = this.shuffle(this.barChartData);
      }
    );
  }

  get x(){
    return this._x;
  }
  set x(value:number) {
    this._x = value;
    this.barChartData = [];
    for (let i=0;i<this.x;i++)
    {
      this.barChartData.push({data: [this.products[i].viewed], label: this.products[i].name});
    }
    this.barChartData = this.shuffle(this.barChartData);
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }
}