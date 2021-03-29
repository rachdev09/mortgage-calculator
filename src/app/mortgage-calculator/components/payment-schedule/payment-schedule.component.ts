import {Component, OnInit} from '@angular/core';
import {PaymentSchedule} from '@mortgage-calculator/mortgage';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss']
})
export class PaymentScheduleComponent implements OnInit {

  constructor(public mortgageService: MortgageService, private router: Router) { }

  ngOnInit(): void {
    if (!this.mortgageService.paymentSchedule?.length) {
      this.router.navigate(['../']);
    }
  }

  getYear(index: number): number {
    const frequency = this.mortgageService.paymentPlan.paymentFrequency;
    if (index === 0){
      return 1;
    } else if (index % frequency === 0) {
      return Math.floor(index / frequency) + 1;
    } else {
      return null;
    }
  }

  isEofYear(index: number): boolean {
    const frequency = this.mortgageService.paymentPlan.paymentFrequency;
    return index > 0 ? (index + 1) % frequency === 0 : false;
  }

  isEofTerm(index: number): boolean {
    const frequency = this.mortgageService.paymentPlan.paymentFrequency;
    const term = this.mortgageService.paymentPlan.term;
    return index + 1 === term * frequency;
  }

  isEofPayments(index: number): boolean {
    const frequency = this.mortgageService.paymentPlan.paymentFrequency;
    const years = this.mortgageService.paymentPlan.amortizationYears;
    return index === years * frequency - 1;
  }

  getYearTotals(index: number): {totals: PaymentSchedule, year: number} {
    const frequency = this.mortgageService.paymentPlan.paymentFrequency;
    index = index + 1;
    const year = Math.floor(index / frequency);
    return {
      totals: this.mortgageService.paymentTotals.yearTotals[year - 1],
      year
    };
  }

  getTermTotals(): PaymentSchedule {
    return this.mortgageService.paymentTotals.termTotals;
  }

  getAfterTermTotals(): PaymentSchedule {
    return this.mortgageService.paymentTotals.afterTermTotals;
  }

  getMortgageTotals(): PaymentSchedule {
    return this.mortgageService.paymentTotals.mortgageTotals;
  }

}
