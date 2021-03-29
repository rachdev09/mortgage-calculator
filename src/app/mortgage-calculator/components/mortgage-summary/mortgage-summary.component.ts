import {Component} from '@angular/core';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';

@Component({
  selector: 'app-mortgage-summary',
  templateUrl: './mortgage-summary.component.html',
  styleUrls: ['./mortgage-summary.component.scss']
})
export class MortgageSummaryComponent {

  constructor(public mortgageService: MortgageService) { }

  get frequency(): string {
    return MortgageUtils.getPaymentFrequencies()
      .find(frequency => frequency.value === this.mortgageService.paymentPlan.paymentFrequency).label;
  }
}
