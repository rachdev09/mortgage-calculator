import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaymentDiagramComponent} from '@mortgage-calculator/components/payment-diagram/payment-diagram.component';

describe('PaymentDiagramComponent', () => {
  let component: PaymentDiagramComponent;
  let fixture: ComponentFixture<PaymentDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
