import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { moneyValue } from '../forms/moneyValues';

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css']
})
export class EfectivoComponent {

  constructor(private fb: FormBuilder){}
  total: number = 0; 
  headerValues: string[] = [
    "Moneda/billete",
    "Cantidad",
    "Total"
  ]
   
  valoresBilletesMoneda: Array<moneyValue> = [
    {valor : 1000 , denominacion: 'oneThousand', subtotal: 0},
    {valor: 500, denominacion:'fiveHundred', subtotal: 0},
    {valor: 200, denominacion: 'twoHundred', subtotal: 0},
    {valor: 100, denominacion: 'oneHundred', subtotal: 0}, 
    {valor: 50, denominacion: 'fifty', subtotal: 0},
    {valor: 20, denominacion: 'twenty', subtotal: 0}, 
    {valor: 10, denominacion: 'ten', subtotal: 0},
    {valor: 5, denominacion: 'five', subtotal: 0},
    {valor:2, denominacion: 'two', subtotal: 0},
    {valor: 1, denominacion: 'one', subtotal: 0},
    {valor: 0.5, denominacion: 'fiftyCents', subtotal: 0}
  ]

  formCash = this.fb.group({
    oneThousand: new FormControl<number|null>(null),
    fiveHundred: [''],
    twoHundred: [''],
    oneHundred: [''],
    fifty: [''],
    twenty: [''],
    //coinTwenty: [''],
    ten: [''],
    five: [''],
    two: [''],
    one: [''],
    fiftyCents: [''],
  });

  // formTotal = this.fb.group({
  //   oneThousandT: new FormControl<number|null>(null),
  //   fiveHundredT: [''],
  //   twoHundredT: [''],
  //   oneHundredT: [''],
  //   fiftyT: [''],
  //   twentyT: [''],
  //   coinTwentyT: [''],
  //   tenT: [''],
  //   fiveT: [''],
  //   twoT: [''],
  //   oneT: [''],
  //   fiftyCentsT: [''],
  // });
 
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
    moneda.subtotal = this.formCash.get(moneda.denominacion)?.value*moneda.valor;
    this.calculateTotal();
  }

  /**
   * 
   */
  calculateTotal():void{
    this.total = 0;
    this.valoresBilletesMoneda.forEach((subtotal)=>{
      if (subtotal.subtotal != null){
        this.total = this.total + subtotal.subtotal;
      } 
    })
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
