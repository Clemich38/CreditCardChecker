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

  // Import card nb JSON files
  var visaCardTab = readJSON('./src/test/cardNbTestDatabase.json');
  var masterCardTab = readJSON('./src/test/cardNbTestMasterDatabase.json');
  var amexCardTab = readJSON('./src/test/cardNbTestAmexDatabase.json');
  var dinnerCardTab = readJSON('./src/test/cardNbTestDinnerDatabase.json');
  var discoverCardTab = readJSON('./src/test/cardNbTestDiscoverDatabase.json');

  // Visa
  for (let i = 0; i < visaCardTab.length; i++)
  {
    it('should display Visa ' + i, fakeAsync(() => {
      testInput(i, visaCardTab);
    }));
  }

  // Master Card
  for (let i = 0; i < masterCardTab.length; i++) {
    it('should display Master Card ' + i, fakeAsync(() => {
      testInput(i, masterCardTab);
    }));
  }

  // Amex
  for (let i = 0; i < amexCardTab.length; i++) {
    it('should display American express ' + i, fakeAsync(() => {
      testInput(i, amexCardTab);
    }));
  }

  // Dinner club
  for (let i = 0; i < dinnerCardTab.length; i++) {
    it('should display Dinner Club ' + i, fakeAsync(() => {
      testInput(i, dinnerCardTab);
    }));
  }

  // Discover
  for (let i = 0; i < discoverCardTab.length; i++) {
    it('should display Discover ' + i, fakeAsync(() => {
      testInput(i, discoverCardTab);
    }));
  }


  function testInput(index: number, testTab)
  {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css("#cardNbInput")).nativeElement;
    input.value = testTab[index].CreditCard.CardNumber;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect((fixture.debugElement.query(By.css("#IINName")).nativeElement).textContent).toContain(testTab[index].CreditCard.IssuingNetwork);
    expect((fixture.debugElement.query(By.css("#IsValid")).nativeElement).textContent).toContain('Valid');
  }
});
