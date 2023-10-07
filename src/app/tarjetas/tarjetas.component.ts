import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  dataSource: MatTableDataSource<any>;
  

  cardReceipts: FormGroup = this.fb.group([this.fb.control('')])
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ){}

  data = [{numero:0, importe: 0.0}]
 displayedColumns: string[] = ['Numero', 'Importe'];
  ngOnInit(): void {  
  }
  addInput1(event:any){
    let numero:number = this.data.length + 1,
      importe: number = Number(event.target.value);


    this.data.push({numero: numero, importe: importe});
    console.log(event.target.value);
    console.log(this.data);
    
    console.log(this.dataSource.data);
    this.changeDetector.detectChanges();
  }
  addInput(index: number):void{
    index = index;
    let i = ""+(index+1)
    console.log(i);
    this.cardReceipts.addControl(i, this.fb.control(''));
    console.log(this.cardReceipts);
    console.log(`#input${i}`);
    console.log(document.querySelector<HTMLInputElement>(`#input0`));
    document.querySelector<HTMLInputElement>(`#input0`).focus();
    this.changeDetector.detectChanges();
    this.focusNewInput(`#input${i}`);
  }

  focusNewInput(id: string):void{
    console.log(document.querySelector<HTMLInputElement>(id));
    document.querySelector<HTMLInputElement>(id).focus();
  }
}
