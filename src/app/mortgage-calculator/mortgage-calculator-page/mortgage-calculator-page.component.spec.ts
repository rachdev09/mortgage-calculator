import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MortgageCalculatorPageComponent} from '@mortgage-calculator/mortgage-calculator-page/mortgage-calculator-page.component';
import {PaymentPlanComponent} from '@mortgage-calculator/components/payment-plan/payment-plan.component';
import {CalculationSummaryComponent} from '@mortgage-calculator/components/calculation-summary/calculation-summary.component';
import {MortgageSummaryComponent} from '@mortgage-calculator/components/mortgage-summary/mortgage-summary.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('MortgageCalculatorPageComponent', () => {
  let component: MortgageCalculatorPageComponent;
  let fixture: ComponentFixture<MortgageCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageCalculatorPageComponent, PaymentPlanComponent, CalculationSummaryComponent, MortgageSummaryComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorPageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input fields with default values', () => {
    expect(component.paymentPlanForm.value).toEqual({
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationYears: 25,
      paymentFrequency: 12,
      term: 5,
      downpaymentPercentage: 0,
      downpaymentAmount: 0
    });
  });

  it('should display calculation summary', () => {
    const calculateButton = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    component.paymentPlanForm.setValue({
      mortgageAmount: 10000,
      interestRate: 5,
      amortizationYears: 2,
      paymentFrequency: 12,
      term: 1,
      downpaymentPercentage: 10,
      downpaymentAmount: 1000
    });
    calculateButton.click();
    fixture.detectChanges();
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('app-calculation-summary h2'))
      .nativeElement as HTMLHeadingElement;
    const tableHeadings = fixture.debugElement.queryAll(By.css('th'));
    const tableRows = fixture.debugElement.queryAll(By.css('td'));

    expect(heading.textContent).toEqual('Calculation Summary');
    expect(tableHeadings[0].nativeElement.textContent).toEqual('Category');
    expect(tableHeadings[1].nativeElement.textContent).toEqual('Term');
    expect(tableHeadings[2].nativeElement.textContent).toEqual('Amortization Period');
    expect(tableHeadings[3].nativeElement.textContent).toEqual('Number of Payments');
    expect(tableHeadings[4].nativeElement.textContent).toEqual('Mortgage Payment');
    expect(tableHeadings[5].nativeElement.textContent).toEqual('Downpayment');
    expect(tableHeadings[6].nativeElement.textContent).toEqual('Principal Payments');
    expect(tableHeadings[7].nativeElement.textContent).toEqual('Interest Payments');
    expect(tableHeadings[8].nativeElement.textContent).toEqual('Total Cost');

    expect(tableRows[0].nativeElement.textContent).toEqual('12');
    expect(tableRows[1].nativeElement.textContent).toEqual('24');
    expect(tableRows[2].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[3].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[4].nativeElement.textContent).toEqual('$1,000.00');
    expect(tableRows[5].nativeElement.textContent).toEqual('$1,000.00');
    expect(tableRows[6].nativeElement.textContent).toEqual('$4,763.38');
    expect(tableRows[7].nativeElement.textContent).toEqual('$9,000.00');
    expect(tableRows[8].nativeElement.textContent).toEqual('$369.57');
    expect(tableRows[9].nativeElement.textContent).toEqual('$476.22');
    expect(tableRows[10].nativeElement.textContent).toEqual('$5,132.95');
    expect(tableRows[11].nativeElement.textContent).toEqual('$9,476.22');
  });

  it('should display mortgage summary', () => {
    const calculateButton = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    component.paymentPlanForm.setValue({
      mortgageAmount: 10000,
      interestRate: 5,
      amortizationYears: 2,
      paymentFrequency: 12,
      term: 1,
      downpaymentPercentage: 10,
      downpaymentAmount: 1000
    });
    calculateButton.click();
    fixture.detectChanges();
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('app-mortgage-summary h2')).nativeElement as HTMLHeadingElement;
    const paragraphElements = fixture.debugElement.queryAll(By.css('p'));
    const listElements = fixture.debugElement.queryAll(By.css('li'));

    expect(heading.textContent).toEqual('Mortgage Summary');
    expect(paragraphElements[0].nativeElement.textContent).toEqual('Over the 2-year amortization period, you will: ');
    expect(paragraphElements[1].nativeElement.textContent).toEqual('Over the 1-year term, you will:');
    expect(paragraphElements[2].nativeElement.textContent).toEqual('At the end of your 1-year term, you will:');

    expect(listElements[0].nativeElement.textContent).toEqual('have made 24 monthly(12x per year) payments of $394.84. ');
    expect(listElements[1].nativeElement.textContent).toEqual('have paid $9,000.00 in principal, $476.22 in interest, for a total of $9,476.22. ');
    expect(listElements[2].nativeElement.textContent).toEqual('have made 12 monthly(12x per year) payments of $394.84. ');
    expect(listElements[3].nativeElement.textContent).toEqual('have paid $4,763.38 in principal, $369.57 in interest, for a total of $5,132.95. ');
    expect(listElements[4].nativeElement.textContent).toEqual('have a balance of $4,236.62.');
  });
});
