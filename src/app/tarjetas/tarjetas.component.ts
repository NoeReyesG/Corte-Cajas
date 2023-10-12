import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  countCardReceipts: number = 0;


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
  }
  addInput1(event:any){
    let numero:number = this.vouchers.length + 1,
      importe: number = Number(event.target.value);


    this.vouchers.push({numero: numero, importe: importe});
    console.log(event.target.value);
    event.target.value = null;
    this.changeDetector.detectChanges();
  }
  addInput(event: any):void{
    let cardValue: number = parseInt(event.target.value),
    i =   "" + this.countCardReceipts;
    console.log(cardValue)
    if (isNaN(cardValue)) return;
    let control = this.fb.group({});
    
    //this.cardReceipts.addControl(i, this.fb.control(cardValue));
    this.formArray.push(this.fb.group({'cardValue': cardValue}));

    this.countCardReceipts++;
    console.log(this.formArray);
    let inputCards: HTMLInputElement = document.querySelector<HTMLInputElement>(`#inputCards`);
    inputCards.value = "";
    
    //this.changeDetector.detectChanges();
    //this.focusNewInput(`#input${i}`);
    //this.changeDetector.detectChanges();
  }

  deleteInput(i:number, from: string):void{
    switch(from){
      case 'cards':
        this.cardReceipts.removeControl(""+i);
        this.countCardReceipts--;
        break;
    }
    
  }

  focusNewInput(id: string):void{
    console.log(document.querySelector<HTMLInputElement>(id));
    document.querySelector<HTMLInputElement>(id).focus();
  }
}
