import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyFormElement, CurrencyType } from '../models/cash';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})

export class TarjetasComponent implements OnInit{

  @Input() currencyValues: any;
  @Input() currencyType: CurrencyType;
  @Input() tableBGColor: string;

  @Output() emitCurrencyData = new EventEmitter<any>();
  
  currencyTotal: number = 0;
  cardReceipts: FormGroup = this.fb.group({
    receiptsArray: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ){}

 displayedColumns: string[] = ['Numero', 'Importe'];

 get receiptsArray(): FormArray<FormGroup<CurrencyFormElement>> {
  return this.cardReceipts.controls["receiptsArray"] as FormArray<FormGroup<CurrencyFormElement>>;
}
  ngOnInit(): void {
    console.log(this.tableBGColor);
    if(this.currencyValues){
      //console.log(this.currencyValues);
      let currencyValuesDataJson = JSON.parse(this.currencyValues);
      this.loadCurrencyValuesData(currencyValuesDataJson);
    }  
  }

  loadCurrencyValuesData(data: any):void{

    data.receiptsArray.forEach((receipt)=>{
      this.receiptsArray.push(this.fb.group<CurrencyFormElement>({'currencyValue': receipt.currencyValue}));
    })

    this.calculateTotal();
  }


  addInput(event: any):void{
    let currencyValue: number = parseFloat(event.target.value);
   
    if (isNaN(currencyValue) || currencyValue <= 0){
      return;
    }

    this.receiptsArray.push(this.fb.group({'currencyValue': currencyValue}));

    let inputCards: HTMLInputElement = document.querySelector<HTMLInputElement>(`#input${this.currencyType}`);
    inputCards.value = "";
    this.calculateTotal();
  }

  deleteInput(i:number, from: CurrencyType):void{
    switch(from){
      case 'cards':
        this.receiptsArray.removeAt(i);
        this.calculateTotal();
        break;
    }
    
  }

  calculateTotal():void{

    this.currencyTotal = 0;
    this.receiptsArray.controls.forEach(receipt => {
      this.currencyTotal = this.currencyTotal + receipt.value.currencyValue;
    });

    let currencyValues = JSON.stringify(this.cardReceipts.getRawValue());
    //sessionStorage.setItem('cardValues', cardvalues);
    let data = {'values': currencyValues};
    this.emitCurrencyData.emit(data);
  }

  focusNewInput(id: string):void{
    console.log(document.querySelector<HTMLInputElement>(id));
    document.querySelector<HTMLInputElement>(id).focus();
  }
}
