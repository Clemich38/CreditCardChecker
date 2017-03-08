import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Credit Card Checker';

  private cardNb: string;
  private MII: string;
  private IIN: string;
  private isValid: boolean;
  private hasGoodLength: boolean;

  private MIINb: number;
  private IINNb: number;

  constructor()
  {
    this.cardNb = "";
    this.MII = "Unknown";
    this.IIN = "Unknown";
    this.hasGoodLength = false;
    this.isValid =  false;
  }

  private Check(value)
  {
    this.MIINb = this.extractDigits(parseInt(value), 1);
    this.IINNb = this.extractDigits(parseInt(value), 6);

    this.cardNb = value;

    let tab: number[] = this.cardNb.split("").map(function (x) { return parseInt(x, 10) });

    if ((tab.length < 12) || (tab.length > 19))
      this.hasGoodLength = false;
    else
    {
      this.isValid = this.LuhnCheck(tab);
      this.MIICheck(tab[0]);
      this.IINCheck(this.extractDigits(parseInt(this.cardNb), 6));
      this.hasGoodLength = true;
    }
  }

  private LuhnCheck(digits: number[]): boolean
  {
    let sum: number = 0;
    let length: number = digits.length;
    for (let i = 0; i < length; i++) {

      // get digits in reverse order
      let digit: number = digits[length - i - 1];

      // every 2nd number multiply with 2
      if (i % 2 == 1)
        digit *= 2;

      sum += digit > 9 ? digit - 9 : digit;
    }
    return sum % 10 == 0;
  }

  private extractDigits(cardNb: number, length: number): number
  {
    let tmpNb: number = cardNb;

    let upperLimit: number = 0;
    for(let i = 0; i < length; i++)
    {
      upperLimit = (upperLimit * 10) + 9;
    }

    while (tmpNb > upperLimit)
    {
      tmpNb = parseInt((tmpNb / 10).toPrecision(), 10);
    }
    return tmpNb;
  }

  private MIICheck(mii: number)
  {
    switch (mii) {
      case 0: this.MII = "ISO/TC 68 and other industry assignments"; break;
      case 1: this.MII = "Airlines"; break;
      case 2: this.MII = "Airlines, financial and other future industry assignments"; break;
      case 3: this.MII = "Travel and entertainment"; break;
      case 4:
      case 5: this.MII = "Banking and financial"; break;
      case 6: this.MII = "Merchandising and banking/financial"; break;
      case 7: this.MII = "Petroleum and other future industry assignments"; break;
      case 8: this.MII = "Healthcare, telecommunications and other future industry assignments"; break;
      case 9: this.MII = "For assignment by national standards bodies"; break;
      default: this.MII = "Unknown";
    }
    
  }

  private IINCheck(iin: number)
  {
    // Visa
    if(this.extractDigits(iin, 1) == 4)
    {
      this.IIN = "Visa";

      // Visa Electron
      let tmpNb = this.extractDigits(iin, 4);
      if ((tmpNb == 4026) || (tmpNb == 4508) || (tmpNb == 4844) || (tmpNb == 4913) || (tmpNb == 4917))
        this.IIN += " Electron";
    }

  }

  get cardNbModel() {
    return this.cardNb;
  }

  set cardNbModel(value) {
    this.Check(value);
  }
}
