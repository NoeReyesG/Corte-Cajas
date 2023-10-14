import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CardFormElement, CurrencyType } from '../models/cash';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  cardReceiptsTotal: number = 0;

  cardReceipts: FormGroup = this.fb.group({
    receiptsArray: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ){}

 displayedColumns: string[] = ['Numero', 'Importe'];

 get receiptsArray(): FormArray<FormGroup<CardFormElement>> {
  return this.cardReceipts.controls["receiptsArray"] as FormArray<FormGroup<CardFormElement>>;
}
  ngOnInit(): void {
    if(sessionStorage.getItem('cardValues')){
      let cardReceiptsData = sessionStorage.getItem('cardValues');
      let cardReceiptsDataJson = JSON.parse(cardReceiptsData);
      this.loadCardReceiptsData(cardReceiptsDataJson);
    }  
  }

  loadCardReceiptsData(data: any):void{
    data.receiptsArray.forEach((receipt)=>{
      this.receiptsArray.push(this.fb.group<CardFormElement>({'cardValue': receipt.cardValue}));
      console.log(receipt);
    })
    this.calculateTotal('cards');
  }


  addInput(event: any):void{
    let cardValue: number = parseInt(event.target.value);
   
    if (isNaN(cardValue)) return;
 
    //this.cardReceipts.addControl(i, this.fb.control(cardValue));
    this.receiptsArray.push(this.fb.group({'cardValue': cardValue}));

    let inputCards: HTMLInputElement = document.querySelector<HTMLInputElement>(`#inputCards`);
    inputCards.value = "";
    this.calculateTotal('cards');
  }

  deleteInput(i:number, from: CurrencyType):void{
    switch(from){
      case 'cards':
        this.receiptsArray.removeAt(i);
        this.calculateTotal(from);
        break;
    }
    
  }

  calculateTotal(from: CurrencyType):void{
    
    switch(from){
      case 'cards':
        this.cardReceiptsTotal = 0;
        this.receiptsArray.controls.forEach(receipt => {
          this.cardReceiptsTotal = this.cardReceiptsTotal + receipt.value.cardValue;
        });
    }
    
    let cardvalues = JSON.stringify(this.cardReceipts.getRawValue())
    sessionStorage.setItem('cardValues', cardvalues);
  }

  focusNewInput(id: string):void{
    console.log(document.querySelector<HTMLInputElement>(id));
    document.querySelector<HTMLInputElement>(id).focus();
  }
}
