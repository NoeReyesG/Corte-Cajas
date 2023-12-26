import { FormatWidth } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-bank-deposit',
  templateUrl: './bank-deposit.component.html',
  styleUrls: ['./bank-deposit.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BankDepositComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
  ){}

  currentDate: Date = new Date();
  numberChecks: number = 0;
  finalCashTotal: number = 0;
  sumChecksTotal: number = 0; 

  bankDepositForm: FormGroup = this.fb.group({
    cashierName: this.fb.control('Noé Reyes'),
    tellerWindowNumber: this.fb.control(1),
    checks1 : this.fb.array([]),
    checks2 : this.fb.array([]),
    checks3 : this.fb.array([])
    
  })

  get checks1(){ return this.bankDepositForm.controls['checks1'] as FormArray}
  get checks2(){ return this.bankDepositForm.controls['checks2'] as FormArray}
  get checks3(){ return this.bankDepositForm.controls['checks3'] as FormArray}

  

  ngOnInit(): void {
    //let control = this.bankDepositForm.get('checks');

    if (sessionStorage.getItem('finalCashTotal')){
      this.finalCashTotal = Number(sessionStorage.getItem('finalCashTotal')); 
    }
    for (let i: number = 0; i <= 9; i++){
      this.checks1.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));
      this.checks2.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));
      this.checks3.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));
    }
  }

  suma(): void{
    this.numberChecks = 0;
    this.sumChecksTotal = 0;
    console.log(this.checks1.at(0).value);

      for (let i: number = 0; i <= 9; i++){
      
        if (this.checks1.at(i).value.number != null && this.checks1.at(i).value.value != null) {
          this.numberChecks= this.numberChecks+1;
          this.sumChecksTotal = this.sumChecksTotal +  this.checks1.at(i).value.value;
        }

        if (this.checks2.at(i).value.number != null && this.checks2.at(i).value.value != null) {
          this.numberChecks= this.numberChecks+1; 
          this.sumChecksTotal = this.sumChecksTotal +  this.checks2.at(i).value.value;
        }
        if (this.checks3.at(i).value.number != null && this.checks3.at(i).value.value != null) {
          this.numberChecks= this.numberChecks+1;
          this.sumChecksTotal = this.sumChecksTotal +  this.checks3.at(i).value.value; 
        }
      }    
  }

}
