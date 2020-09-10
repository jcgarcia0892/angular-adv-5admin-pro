import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo:string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

 

  public colors: Color[] = [
    { backgroundColor: ['#6857e6', '#009fee', '#f02059'] }
  ];

}
