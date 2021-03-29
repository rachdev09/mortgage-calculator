import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SkipToTargetComponent } from '@core/accessibility/skip-to-target/skip-to-target.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        SkipToTargetComponent
      ],
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const skipToTarget = fixture.debugElement.query(By.css('app-skip-to-target a')).nativeElement as HTMLAnchorElement;
    expect(skipToTarget).toBeTruthy();
    const heading = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLHeadingElement;
    expect(heading.textContent).toBe('Mortgage Calculator');
  });
});
