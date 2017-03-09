import { tick, TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { readJSON } from 'karma-read-json/karma-read-json';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Credit Card Checker'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Credit Card Checker');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Credit Card Checker');
  }));

  for(let i = 0; i<10; i++)
  {
    it('should display Visa', fakeAsync(() => {
      testInput(i);
    }));
  }

  function testInput(index: number)
  {
    var cardTab = readJSON('./src/test/cardNbTestDatabase.json');

    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css("#cardNbInput")).nativeElement;
    input.value = cardTab[index].CreditCard.CardNumber;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect((fixture.debugElement.query(By.css("#IINName")).nativeElement).textContent).toContain(cardTab[index].CreditCard.IssuingNetwork);
  }
});
