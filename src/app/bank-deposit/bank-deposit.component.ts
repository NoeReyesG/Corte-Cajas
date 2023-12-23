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

  bankDepositForm: FormGroup = this.fb.group({
    checks : this.fb.array([])
  })

  get checks(){ return this.bankDepositForm.controls['checks'] as FormArray}

  

  ngOnInit(): void {
    //let control = this.bankDepositForm.get('checks');
    for (let i: number = 0; i <= 9; i++){
      this.checks.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));
    }
    
  }

}
