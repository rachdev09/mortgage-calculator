import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SkipToTargetComponent} from './skip-to-target.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {By} from '@angular/platform-browser';

class RouterStub {
  private events$ = new BehaviorSubject<NavigationEnd>(new NavigationEnd(0, '/', '/'));
  private url = '/';
  readonly events = this.events$.asObservable();

  public triggerEvent(routerEvent: NavigationEnd): void {
    this.url = routerEvent.url;
    this.events$.next(routerEvent);
  }
}
describe('SkipToTargetComponent', () => {
  let component: SkipToTargetComponent;
  let fixture: ComponentFixture<SkipToTargetComponent>;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkipToTargetComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipToTargetComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate proper href link', fakeAsync(() => {
    component.title = 'Skip to Target';
    component.targetId = 'main-content';

    router.triggerEvent(new NavigationEnd(1, 'http://localhost:4200/mortgage-calculator', 'http://localhost:4200/mortgage-calculator'));
    tick();
    fixture.detectChanges();
    const anchorElement: HTMLAnchorElement = fixture.debugElement.query(By.css('.skip-to-target a')).nativeElement as HTMLAnchorElement;
    expect(anchorElement).toBeTruthy();
    expect(anchorElement.href).toBe('http://localhost:4200/mortgage-calculator#main-content');
    expect(anchorElement.textContent).toBe('Skip to Target');
  }));

});
