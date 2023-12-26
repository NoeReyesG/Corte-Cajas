
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
    checks : this.fb.array([]),
    
  })

  get checks(){ return this.bankDepositForm.controls['checks'] as FormArray}
  
  

  ngOnInit(): void {
    //let control = this.bankDepositForm.get('checks');

    if (sessionStorage.getItem('finalCashTotal')){
      this.finalCashTotal = Number(sessionStorage.getItem('finalCashTotal')); 
    }
    for (let i: number = 0; i <= 29; i++){
      this.checks.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));
      
    }
  }

  suma(): void{
    this.numberChecks = 0;
    this.sumChecksTotal = 0;

      for (let i: number = 0; i <= 29; i++){
      
        if (this.checks.at(i).value.number != null && this.checks.at(i).value.value != null) {
          this.numberChecks= this.numberChecks+1;
          this.sumChecksTotal = this.sumChecksTotal +  this.checks.at(i).value.value;
        }
      }    
  }

  print():void {
    window.print();
  }

}
