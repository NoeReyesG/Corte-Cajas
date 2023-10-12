import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  cardReceiptsTotal: number = 0;

  // this.myForm = this.fb.group({
  //   formArray: this.fb.array([this.fb.control('')]),
  // });
  cardReceipts: FormGroup = this.fb.group({
    formArray: this.fb.array([]),
  })
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ){}

  vouchers = []
 displayedColumns: string[] = ['Numero', 'Importe'];

 get formArray(): FormArray {
  return this.cardReceipts.controls["formArray"] as FormArray;
}
  ngOnInit(): void {
    if(sessionStorage.getItem('cardValues')){
      let cardReceiptsData = sessionStorage.getItem('cardValues');
      let cardReceiptsDataJson = JSON.parse(cardReceiptsData);
      console.log(cardReceiptsDataJson);
      this.loadCardReceiptsData(cardReceiptsDataJson);
    }  
  }

  loadCardReceiptsData(data):void{
    data.formArray.forEach(receipt=>{
      this.formArray.push(this.fb.group({'cardValue': receipt.cardValue}));
      console.log(receipt.cardValue);
    })
    this.calculateTotal('cards')
  }
  addInput1(event:any){
    let numero:number = this.vouchers.length + 1,
      importe: number = Number(event.target.value);


    this.vouchers.unshift({numero: numero, importe: importe});
    console.log(event.target.value);
    event.target.value = null;
    this.changeDetector.detectChanges();
  }
  addInput(event: any):void{
    let cardValue: number = parseInt(event.target.value);
   
    //console.log(cardValue)
    if (isNaN(cardValue)) return;

    
    //this.cardReceipts.addControl(i, this.fb.control(cardValue));
    this.formArray.push(this.fb.group({'cardValue': cardValue}));

    //console.log(this.formArray);
    let inputCards: HTMLInputElement = document.querySelector<HTMLInputElement>(`#inputCards`);
    inputCards.value = "";
    this.calculateTotal('cards');
    //this.changeDetector.detectChanges();
    //this.focusNewInput(`#input${i}`);
    //this.changeDetector.detectChanges();
  }

  deleteInput(i:number, from: string):void{
    switch(from){
      case 'cards':
        this.formArray.removeAt(i);
        this.calculateTotal(from);
        break;
    }
    
  }

  calculateTotal(from: string):void{
    
    switch(from){
      case 'cards':
        this.cardReceiptsTotal = 0;
        this.formArray.controls.forEach(receipt => {
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
