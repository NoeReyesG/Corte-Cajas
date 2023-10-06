import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  cards: FormGroup = this.fb.group({
    cardReceipts: this.fb.array([])  
  })

  constructor(
    private fb: FormBuilder,
  ){}

  get cardReceipts(): FormArray{
    return this.cards.controls['cardReceipts'] as FormArray;
  }
  ngOnInit(): void {  
    this.cardReceipts.push(this.fb.control(''));
  }
  addInput(index: number):void{
    index = index;
    this.cardReceipts.push(this.fb.control(''));
    console.log(this.cardReceipts);
    document.querySelector<HTMLInputElement>(`#input${index}`).focus();
  }
}
