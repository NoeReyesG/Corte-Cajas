import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { moneyValue } from '../forms/moneyValues';
import { Cash } from '../models/cashModel';
import { cashService } from '../services/cash-service';

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css']
})
export class EfectivoComponent {

  constructor(
    private fb: FormBuilder,
    private cashService: cashService
    ){}
  total: number = 0; 
  headerValues: string[] = [
    "Moneda/billete",
    "Cantidad",
    "Total"
  ]
   
  valoresBilletesMoneda: Array<moneyValue> = [
    {value: 1000 , denomination: 'oneThousand', subtotal: 0},
    {value: 500, denomination: 'fiveHundred', subtotal: 0},
    {value: 200, denomination: 'twoHundred', subtotal: 0},
    {value: 100, denomination: 'oneHundred', subtotal: 0}, 
    {value: 50, denomination: 'fifty', subtotal: 0},
    {value: 20, denomination: 'twenty', subtotal: 0}, 
    {value: 10, denomination: 'ten', subtotal: 0},
    {value: 5, denomination: 'five', subtotal: 0},
    {value: 2, denomination: 'two', subtotal: 0},
    {value: 1, denomination: 'one', subtotal: 0},
    {value: 0.5, denomination: 'fiftyCents', subtotal: 0}
  ]

  cashForm = this.fb.group({
    oneThousand: new FormControl<number|undefined|null>(undefined),
    fiveHundred: new FormControl<number|undefined|null>(undefined),
    twoHundred: new FormControl<number|undefined|null>(undefined),
    oneHundred: new FormControl<number|undefined|null>(undefined),
    fifty: new FormControl<number|undefined|null>(undefined),
    twenty: new FormControl<number|undefined|null>(undefined),
    //coinTwenty: [''],
    ten: new FormControl<number|undefined|null>(undefined),
    five: new FormControl<number|undefined|null>(undefined),
    two: new FormControl<number|undefined|null>(undefined),
    one: new FormControl<number|undefined|null>(undefined),
    fiftyCents: new FormControl<number|undefined|null>(undefined),
  });

  tellerCashForm = this.fb.group({
    oneThousand: new FormControl<number|undefined|null>(undefined),
    fiveHundred: new FormControl<number|undefined|null>(undefined),
    twoHundred: new FormControl<number|undefined|null>(undefined),
    oneHundred: new FormControl<number|undefined|null>(undefined),
    fifty: new FormControl<number|undefined|null>(undefined),
    twenty: new FormControl<number|undefined|null>(undefined),
    //coinTwenty: [''],
    ten: new FormControl<number|undefined|null>(undefined),
    five: new FormControl<number|undefined|null>(undefined),
    two: new FormControl<number|undefined|null>(undefined),
    one: new FormControl<number|undefined|null>(undefined),
    fiftyCents: new FormControl<number|undefined|null>(undefined),
  });

  
  /**
   * ngOnInit
   */
  ngOnInit():void{
  }

  /**
   * 
   * @param {moneyValue} moneda 
   */
  calculateSubtotal(moneda: moneyValue): void{
    moneda.subtotal = this.cashForm.get(moneda.denomination)?.value*moneda.value;
    this.calculateTotal();
  }

  /**
   * 
   * It tells the teller-cash money that must be saved at the end of the day. currently 2000 pesos  
   */
  calculateTellerCash(): void{
    let tellerCash:number = 2000, from: number=10;
    let subtotal: number = 0;
    for (let index = this.valoresBilletesMoneda.length - 1; index >= 0; index--) {
      const moneyValues: moneyValue = this.valoresBilletesMoneda[index];
      subtotal= subtotal + moneyValues.subtotal;
      if (subtotal >= 2000) {
        from = index;
        break
      }
    }
    
    this.tellerCashForm.reset();
    let remainder:number = subtotal-2000, aux: number = 0, amountRequested: number = 0;
    for (let index = from; index <= 9; index++) {
      const moneyValues: moneyValue = this.valoresBilletesMoneda[index];
      let amountPerDenomination = this.cashForm.get(moneyValues.denomination)?.value
      if ( amountPerDenomination > 0){
        amountRequested = Math.trunc(remainder/moneyValues.value);
        
        
        
        if (amountPerDenomination-amountRequested >= 0){
          this.tellerCashForm.get(moneyValues.denomination)?.setValue(amountPerDenomination-amountRequested);
          remainder = remainder%moneyValues.value;  
        }
        else{
          this.tellerCashForm.get(moneyValues.denomination)?.setValue(0);
          remainder = remainder - moneyValues.subtotal;
        }
      }
    }
    console.log(this.tellerCashForm);
   
  }
  /**
   * 
   */
  calculateTotal():void{
    this.total = 0;
    this.valoresBilletesMoneda.forEach((subtotal: moneyValue)=>{
      if (subtotal.subtotal != null){
        this.total = this.total + subtotal.subtotal;
      } 
    })
    this.calculateTellerCash();
  }

  /**
   * 
   */
  saveCash():void{
    const cash: Cash = new Cash(this.cashForm.value);
    this.cashService.createCashRegister(cash).subscribe();
    //console.log(cash);
  }

  resetForm():void{
    this.total = 0;
    this.valoresBilletesMoneda.forEach((subtotal: moneyValue)=>{
      if (subtotal.subtotal != null){
        subtotal.subtotal = 0;
      } 
    })
  }
}
