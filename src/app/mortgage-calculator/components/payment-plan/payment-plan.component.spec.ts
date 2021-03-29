import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaymentPlanComponent} from '@mortgage-calculator/components/payment-plan/payment-plan.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';

const fb = new FormBuilder();
describe('PaymentPlanComponent', () => {
  let component: PaymentPlanComponent;
  let fixture: ComponentFixture<PaymentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanComponent);
    component = fixture.componentInstance;
    component.paymentPlanForm = fb.group({
      mortgageAmount: [100000, [
        Validators.required,
        Validators.min(1),
        Validators.pattern(MortgageUtils.NumberPattern)
      ]],
      interestRate: [5.00, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(MortgageUtils.NumberPattern)
      ]],
      amortizationYears: [25],
      paymentFrequency: [12],
      term: [5],
      downpaymentPercentage: [0, [
        Validators.min(0)
      ]],
      downpaymentAmount: [0, [
        Validators.min(0),
        Validators.max(100000), // TODO: Update validator
        Validators.pattern(MortgageUtils.NumberPattern)
      ]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all fields', () => {
    const labelElements = fixture.debugElement.queryAll(By.css('label'));
    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    const selectElements = fixture.debugElement.queryAll(By.css('select'));
    const headings = fixture.debugElement.queryAll(By.css('h2'));

    expect(labelElements.length).toBe(7);
    expect(inputElements.length).toBe(4);
    expect(selectElements.length).toBe(3);
    expect(headings.length).toBe(2);

    expect(labelElements[0].nativeElement.textContent).toBe(' Mortgage Amount: ');
    expect(labelElements[1].nativeElement.textContent).toBe(' Interest Rate: ');
    expect(labelElements[2].nativeElement.textContent).toContain(' Amortization Period: ');
    expect(labelElements[3].nativeElement.textContent).toContain(' Payment Frequency: ');
    expect(labelElements[4].nativeElement.textContent).toContain(' Term: ');
    expect(labelElements[5].nativeElement.textContent).toBe(' Downpayment Percentage: ');
    expect(labelElements[6].nativeElement.textContent).toBe(' Downpayment Amount: ');

    expect((inputElements[0].nativeElement as HTMLInputElement).value).toBe('100000');
    expect((inputElements[1].nativeElement as HTMLInputElement).value).toBe('5');
    expect((inputElements[2].nativeElement as HTMLInputElement).value).toBe('0');
    expect((inputElements[3].nativeElement as HTMLInputElement).value).toBe('0');

    expect((selectElements[0].nativeElement as HTMLSelectElement).value).toBe('25');
    expect((selectElements[1].nativeElement as HTMLSelectElement).value).toBe('12');
    expect((selectElements[2].nativeElement as HTMLSelectElement).value).toBe('5');
  });

  it('should emit calculate event on click of calculate button', () => {
    const eventEmitterSpy = spyOn(component.calculate, 'emit');
    const calculateButton = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    calculateButton.click();
    expect(eventEmitterSpy).toHaveBeenCalled();
  });

});
