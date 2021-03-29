import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MortgageSummaryComponent} from '@mortgage-calculator/components/mortgage-summary/mortgage-summary.component';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {By} from '@angular/platform-browser';

describe('MortgageSummaryComponent', () => {
  let component: MortgageSummaryComponent;
  let fixture: ComponentFixture<MortgageSummaryComponent>;
  let service: MortgageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageSummaryComponent);
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

  it('should display mortgage summary based on payment plan ', () => {
    const heading: HTMLHeadingElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLHeadingElement;
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
