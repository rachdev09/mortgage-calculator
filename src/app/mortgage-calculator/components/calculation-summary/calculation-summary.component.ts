import {Component} from '@angular/core';
import {MortgageService} from '@mortgage-calculator/mortgage.service';

@Component({
  selector: 'app-calculation-summary',
  templateUrl: './calculation-summary.component.html',
  styleUrls: ['./calculation-summary.component.scss']
})
export class CalculationSummaryComponent {

  constructor(public mortgageService: MortgageService) { }

}
