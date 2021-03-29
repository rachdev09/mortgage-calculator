import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculationSummaryComponent} from '@mortgage-calculator/components/calculation-summary/calculation-summary.component';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {By} from '@angular/platform-browser';

describe('CalculationSummaryComponent', () => {
  let component: CalculationSummaryComponent;
  let fixture: ComponentFixture<CalculationSummaryComponent>;
  let service: MortgageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationSummaryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MortgageService);
    service.paymentPlan = {
      mortgageAmount: 10000,
      principal: 90000,
      interestRate: 5,
      amortizationYears: 2,
      paymentFrequency: 12,
      term: 1,
      downpaymentPercentage: 10,
      downpaymentAmount: 1000
    };
    service.calculateMortgage(service.paymentPlan);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display calculation summary based on payment plan ', () => {
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLHeadingElement;
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


});
