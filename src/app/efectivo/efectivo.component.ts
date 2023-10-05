import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { moneyValue } from '../forms/moneyValues';
import { Cash } from '../models/cashModel';
import { CashService } from '../services/cash-service';
import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css']
})
export class EfectivoComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private cashService: CashService,
    private notificationService: NotificationService, 
    ){}

  total: number = 0;
  tellerCashTotal: number = 0;
  finalCashTotal: number = 0;

  headerValues: string[] = [
    "Moneda/billete",
    "Cantidad",
    "Total"
  ]
   
  valoresBilletesMoneda: Array<moneyValue> = []
  tellerCashInfo: Array<moneyValue> = []
  finalCashInfo: Array<moneyValue> = []

  cashForm: FormGroup;
  tellerCashForm: FormGroup;
  finalCashForm: FormGroup;
  
  
  /**
   * ngOnInit
   */
  ngOnInit():void{
    this.initForms();
    this.initTable(this.valoresBilletesMoneda);
    this.initTable(this.tellerCashInfo);
    this.initTable(this.finalCashInfo);
  }

  initTable(tableInfo: Array<moneyValue>):void{
    tableInfo.push(
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
    );
  }  
  initForms(): void{
   this.cashForm = this.fb.group({
      oneThousand: new FormControl<number|undefined|null>(undefined),
      fiveHundred: new FormControl<number|undefined|null>(undefined),
      twoHundred: new FormControl<number|undefined|null>(undefined),
      oneHundred: new FormControl<number|undefined|null>(undefined),
      fifty: new FormControl<number|undefined|null>(undefined),
      twenty: new FormControl<number|undefined|null>(undefined),
      ten: new FormControl<number|undefined|null>(undefined),
      five: new FormControl<number|undefined|null>(undefined),
      two: new FormControl<number|undefined|null>(undefined),
      one: new FormControl<number|undefined|null>(undefined),
      fiftyCents: new FormControl<number|undefined|null>(undefined),
    });
   this.tellerCashForm = this.fb.group({
      oneThousand: new FormControl<number|undefined|null>(undefined),
      fiveHundred: new FormControl<number|undefined|null>(undefined),
      twoHundred: new FormControl<number|undefined|null>(undefined),
      oneHundred: new FormControl<number|undefined|null>(undefined),
      fifty: new FormControl<number|undefined|null>(undefined),
      twenty: new FormControl<number|undefined|null>(undefined),
      ten: new FormControl<number|undefined|null>(undefined),
      five: new FormControl<number|undefined|null>(undefined),
      two: new FormControl<number|undefined|null>(undefined),
      one: new FormControl<number|undefined|null>(undefined),
      fiftyCents: new FormControl<number|undefined|null>(undefined),
    });
   this.finalCashForm = this.fb.group({
      oneThousand: new FormControl<number|undefined|null>(undefined),
      fiveHundred: new FormControl<number|undefined|null>(undefined),
      twoHundred: new FormControl<number|undefined|null>(undefined),
      oneHundred: new FormControl<number|undefined|null>(undefined),
      fifty: new FormControl<number|undefined|null>(undefined),
      twenty: new FormControl<number|undefined|null>(undefined),
      ten: new FormControl<number|undefined|null>(undefined),
      five: new FormControl<number|undefined|null>(undefined),
      two: new FormControl<number|undefined|null>(undefined),
      one: new FormControl<number|undefined|null>(undefined),
      fiftyCents: new FormControl<number|undefined|null>(undefined),
    });
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
   * It calculates the total of all money captured in cash table 
   */
  calculateTotal():void{
    this.total = 0;
    this.valoresBilletesMoneda.forEach((subtotal: moneyValue)=>{
      if (subtotal.subtotal != null){
        this.total = this.total + subtotal.subtotal;
      } 
    })
  }

  
  /**
   * 
   * It indicates in tellerCashForm how many billets and coins must save the teller at the end of the day  
   */
  calculateTellerCash(): void{
    let from: number=10, subtotal: number = 0;
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
        
        //Check if there's enough coin/bills
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
    this.calculateSubtotalsTellerCash();
     
  }

  /**
   * It calculates the subtotals values of every currency and calculates the total for the teller-cash cash table
   *  
   */
  calculateSubtotalsTellerCash(){
    this.tellerCashTotal = 0; 
    this.tellerCashInfo.forEach((element: moneyValue) => {
      element.subtotal = this.tellerCashForm.get(element.denomination)?.value*element.value;
      this.tellerCashTotal = this.tellerCashTotal + element.subtotal;
    });
    if (this.tellerCashTotal != 2000){
      this.resetTellerCashForm();
      this.notificationService.showWarning('Tas pendejo o qué mijo? Ahi no hay 2 varos');
    }
    else{
      this.calculateFinalCash();
      this.notificationService.showSuccess("Se realizó el cálculo del fondo fijo correctamente");
    }
  }

  /**
   * It calculates the subtotals values of every currency and calculates the total for the final cash table
   */
  calculateFinalCash():void{
    let subtotal = 0;
    this.finalCashTotal = 0;
    
    this.finalCashInfo.forEach((moneyValues: moneyValue)=>{
      let setValue = this.cashForm.get(moneyValues.denomination).value-this.tellerCashForm.get(moneyValues.denomination).value;
      this.finalCashForm.get(moneyValues.denomination).setValue(setValue);
      subtotal = setValue*moneyValues.value
      moneyValues.subtotal = subtotal;
      this.finalCashTotal = this.finalCashTotal + (subtotal); 
    });
  }

  /**
   * call the service with end-points to save the total cash table 
   */
  saveCash():void{
    const cash: Cash = new Cash(this.cashForm.value);
    this.cashService.createCashRegister(cash).subscribe();
  }

  /**
   * reset the three tables of cash. all cash, teller cash and final cash
   */
  resetForms():void{
    this.total = 0;
    this.finalCashTotal = 0;

    this.cashForm.reset();
    this.finalCashForm.reset();
    
    this.finalCashInfo.forEach((currencyInfo: moneyValue)=>{
      currencyInfo.subtotal = 0;
    });
    this.valoresBilletesMoneda.forEach((currencyInfo: moneyValue)=>{
      if (currencyInfo.subtotal != null){
        currencyInfo.subtotal = 0;
      } 
    });

    this.resetTellerCashForm();
  }

  /**
   * reset all info related with tellercash table 
   */
  resetTellerCashForm(): void{
    this.tellerCashTotal = 0;
    this.tellerCashForm.reset();
    this.tellerCashInfo.forEach((currencyInfo: moneyValue)=>{
      currencyInfo.subtotal = 0;
    });
  }
}
