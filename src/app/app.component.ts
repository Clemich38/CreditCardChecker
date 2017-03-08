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
  private MIINb: number;
  private IINNb: number;
  private isValid: boolean;
  private hasGoodLength: boolean;

  constructor()
  {
    this.cardNb = "";
    this.MII = "Unknown";
    this.IIN = "Unknown";
    this.hasGoodLength = false;
    this.isValid =  false;
  }

  // Method called every time the Card number is modified
  // Parform all the checks and parsing, and update the class member variables
  private Check(value)
  {
    this.MIINb = this.extractDigits(parseInt(value), 1);
    this.IINNb = this.extractDigits(parseInt(value), 6);

    this.cardNb = value;

    // Create a number array from the input string
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

  // Method implementing the Luhn algorithm to check the card number integrity
  private LuhnCheck(digits: number[]): boolean
  {
    let sum: number = 0;
    let length: number = digits.length;
    for (let i = 0; i < length; i++) {

      // Invert the digits order
      let digit: number = digits[length - i - 1];

      // Every 2nd number is multiply by 2
      if (i % 2 == 1)
        digit *= 2;

      sum += digit > 9 ? digit - 9 : digit;
    }
    return sum % 10 == 0;
  }

  // Method to extract n (length) digits from a decimal number starting from the left
  private extractDigits(cardNb: number, length: number): number
  {
    let tmpNb: number = cardNb;

    // Get the max decimal value for a specific decimal nb length 
    // if length is 4, upperLimit will be 9999
    let upperLimit: number = 0;
    for(let i = 0; i < length; i++)
    {
      upperLimit = (upperLimit * 10) + 9;
    }

    // Extract the n (length) fisrt digits
    while (tmpNb > upperLimit)
    {
      tmpNb = parseInt((tmpNb / 10).toPrecision(), 10);
    }
    return tmpNb;
  }

  // Major Industry Identifier parsing
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

  // Issuer Identifier Number parsing
  private IINCheck(iin: number)
  {
    let tmpNb: number = 0;
    this.IIN = "Unknown";

    // Visa (4)
    tmpNb = this.extractDigits(iin, 1);
    if(tmpNb == 4)
    {
      this.IIN = "Visa";

      // Visa Electron
      tmpNb = this.extractDigits(iin, 4);
      if ((tmpNb == 4026) || (tmpNb == 4508) || (tmpNb == 4844) || (tmpNb == 4913) || (tmpNb == 4917))
        this.IIN += " Electron";
    }

    // Discover
    else if(tmpNb == 6)
    {
      tmpNb = this.extractDigits(iin, 4);
      if (tmpNb == 6011)
        this.IIN = "Discover Card";
        
      tmpNb = this.extractDigits(iin, 3);
      if (tmpNb >= 644 && tmpNb <= 649)
        this.IIN = "Discover Card";

      tmpNb = this.extractDigits(iin, 2);
      if (tmpNb == 65)
        this.IIN = "Discover Card";

      if (iin >= 622126 && iin <= 622925)
        this.IIN = "Discover Card";
    }

    else
    {
      // Master Card (51 - 55)
      tmpNb = this.extractDigits(iin, 2);
      if (tmpNb >= 51 && tmpNb <= 55)
      {
        this.IIN = "MasterCard";
      }

      // Dinners Club (36 38)
      else if ((tmpNb == 36) || (tmpNb == 38))
      {
        this.IIN = "Diners Club";
      }

      // American Express (Amex) (34 37)
      else if ((tmpNb == 34) || (tmpNb == 37)) {
        this.IIN = "American Express (Amex)";
      }

      // Japan Credit Bureau  (35)
      else if (tmpNb == 35)
      {
        this.IIN = "Japan Credit Bureau (JCB)";
      }
    }

  }

  get cardNbModel() {
    return this.cardNb;
  }

  set cardNbModel(value) {
    this.Check(value);
  }
}
