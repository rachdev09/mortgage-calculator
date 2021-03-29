import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PaymentScheduleComponent} from '@mortgage-calculator/components/payment-schedule/payment-schedule.component';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('PaymentScheduleComponent', () => {
  let component: PaymentScheduleComponent;
  let fixture: ComponentFixture<PaymentScheduleComponent>;
  let service: MortgageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentScheduleComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScheduleComponent);
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

  it('should display payment schedule based on payment plan ', () => {
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLHeadingElement;
    const tableHeadings = fixture.debugElement.queryAll(By.css('th'));
    const tableRows = fixture.debugElement.queryAll(By.css('td'));

    expect(heading.textContent).toEqual('Payment Schedule');
    expect(tableHeadings[0].nativeElement.textContent).toEqual('Period');
    expect(tableHeadings[1].nativeElement.textContent).toEqual('Principal Payment');
    expect(tableHeadings[2].nativeElement.textContent).toEqual('Interest Payment');
    expect(tableHeadings[3].nativeElement.textContent).toEqual('Total Payment');
    expect(tableHeadings[4].nativeElement.textContent).toEqual('Ending Balance');
    expect(tableHeadings[5].nativeElement.textContent).toEqual('Term');
    expect(tableHeadings[6].nativeElement.textContent).toEqual('Year 1');
    expect(tableHeadings[7].nativeElement.textContent).toEqual('Payment 1');
    expect(tableHeadings[8].nativeElement.textContent).toEqual('Payment 2');
    expect(tableHeadings[9].nativeElement.textContent).toEqual('Payment 3');
    expect(tableHeadings[10].nativeElement.textContent).toEqual('Payment 4');
    expect(tableHeadings[11].nativeElement.textContent).toEqual('Payment 5');
    expect(tableHeadings[12].nativeElement.textContent).toEqual('Payment 6');
    expect(tableHeadings[13].nativeElement.textContent).toEqual('Payment 7');
    expect(tableHeadings[14].nativeElement.textContent).toEqual('Payment 8');
    expect(tableHeadings[15].nativeElement.textContent).toEqual('Payment 9');
    expect(tableHeadings[16].nativeElement.textContent).toEqual('Payment 10');
    expect(tableHeadings[17].nativeElement.textContent).toEqual('Payment 11');
    expect(tableHeadings[18].nativeElement.textContent).toEqual('Payment 12');
    expect(tableHeadings[19].nativeElement.textContent).toEqual('Year 1 Totals');
    expect(tableHeadings[20].nativeElement.textContent).toEqual('$4,387.76');
    expect(tableHeadings[21].nativeElement.textContent).toEqual('$350.35');
    expect(tableHeadings[22].nativeElement.textContent).toEqual('$4,738.11');
    expect(tableHeadings[23].nativeElement.textContent).toEqual('$4,612.24');
    expect(tableHeadings[24].nativeElement.textContent).toEqual('Term Totals');
    expect(tableHeadings[25].nativeElement.textContent).toEqual('$4,763.38');
    expect(tableHeadings[26].nativeElement.textContent).toEqual('$369.57');
    expect(tableHeadings[27].nativeElement.textContent).toEqual('$5,132.95');
    expect(tableHeadings[28].nativeElement.textContent).toEqual('$4,612.24');
    expect(tableHeadings[29].nativeElement.textContent).toEqual('After Term');
    expect(tableHeadings[30].nativeElement.textContent).toEqual('Year 2');
    expect(tableHeadings[31].nativeElement.textContent).toEqual('Payment 13');
    expect(tableHeadings[32].nativeElement.textContent).toEqual('Payment 14');
    expect(tableHeadings[33].nativeElement.textContent).toEqual('Payment 15');
    expect(tableHeadings[34].nativeElement.textContent).toEqual('Payment 16');
    expect(tableHeadings[35].nativeElement.textContent).toEqual('Payment 17');
    expect(tableHeadings[36].nativeElement.textContent).toEqual('Payment 18');
    expect(tableHeadings[37].nativeElement.textContent).toEqual('Payment 19');
    expect(tableHeadings[38].nativeElement.textContent).toEqual('Payment 20');
    expect(tableHeadings[39].nativeElement.textContent).toEqual('Payment 21');
    expect(tableHeadings[40].nativeElement.textContent).toEqual('Payment 22');
    expect(tableHeadings[41].nativeElement.textContent).toEqual('Payment 23');
    expect(tableHeadings[42].nativeElement.textContent).toEqual('Payment 24');
    expect(tableHeadings[43].nativeElement.textContent).toEqual('Year 2 Totals');
    expect(tableHeadings[44].nativeElement.textContent).toEqual('$4,612.24');
    expect(tableHeadings[45].nativeElement.textContent).toEqual('$125.87');
    expect(tableHeadings[46].nativeElement.textContent).toEqual('$4,738.11');
    expect(tableHeadings[47].nativeElement.textContent).toEqual('$0.00');
    expect(tableHeadings[48].nativeElement.textContent).toEqual('After Term Totals');
    expect(tableHeadings[49].nativeElement.textContent).toEqual('$4,236.62');
    expect(tableHeadings[50].nativeElement.textContent).toEqual('$106.65');
    expect(tableHeadings[51].nativeElement.textContent).toEqual('$4,343.27');
    expect(tableHeadings[52].nativeElement.textContent).toEqual('$0.00');
    expect(tableHeadings[53].nativeElement.textContent).toEqual('Mortgage Totals');
    expect(tableHeadings[54].nativeElement.textContent).toEqual('$9,000.00');
    expect(tableHeadings[55].nativeElement.textContent).toEqual('$476.22');
    expect(tableHeadings[56].nativeElement.textContent).toEqual('$9,476.22');
    expect(tableHeadings[57].nativeElement.textContent).toEqual('$0.00');

    // Random checks since huge list
    expect(tableRows[0].nativeElement.textContent).toEqual('$357.34');
    expect(tableRows[1].nativeElement.textContent).toEqual('$37.50');
    expect(tableRows[2].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[3].nativeElement.textContent).toEqual('$8,642.66');
    expect(tableRows[4].nativeElement.textContent).toEqual('$358.83');
    expect(tableRows[5].nativeElement.textContent).toEqual('$36.01');
    expect(tableRows[6].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[7].nativeElement.textContent).toEqual('$8,283.83');
    expect(tableRows[20].nativeElement.textContent).toEqual('$364.85');
    expect(tableRows[21].nativeElement.textContent).toEqual('$29.99');
    expect(tableRows[22].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[23].nativeElement.textContent).toEqual('$6,833.49');
    expect(tableRows[92].nativeElement.textContent).toEqual('$393.20');
    expect(tableRows[93].nativeElement.textContent).toEqual('$1.64');
    expect(tableRows[94].nativeElement.textContent).toEqual('$394.84');
    expect(tableRows[95].nativeElement.textContent).toEqual('$0.00');
  });
});
