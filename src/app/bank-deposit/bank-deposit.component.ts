
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
  
  numberChecks: number = 0;
  currentDate: string; 
  finalCashTotal: number = 0;
  sumChecksTotal: number = 0;
  display: string = 'none';
  displayPrintButtons = 'flex'; 

  bankDepositForm: FormGroup = this.fb.group({
    cashierName: this.fb.control('Noé Reyes'),
    tellerWindowNumber: this.fb.control(1),
    reference: this.fb.control(''),
    finalCashTotalControl: this.fb.control(0),
    checks : this.fb.array([]),
    
  })

  get checks(){ return this.bankDepositForm.controls['checks'] as FormArray}
  
  

  ngOnInit(): void {
    //let control = this.bankDepositForm.get('checks');
    this.currentDate = new Intl.DateTimeFormat("es-ES",{
      dateStyle: "long"
    }).format(new Date());
    
    if (sessionStorage.getItem('configValues')){
      let configValues = sessionStorage.getItem('configValues');
      let configValuesJson = JSON.parse(configValues);
    
      this.finalCashTotal =  this.finalCashTotal + (configValuesJson.withdrawals * configValuesJson.withdrawalAmount)
      this.bankDepositForm.get('cashierName').setValue(configValuesJson.name);
      this.bankDepositForm.get('reference').setValue(configValuesJson.bankDepositReference);

    }
    if (sessionStorage.getItem('finalCashTotal')){
      this.finalCashTotal = this.finalCashTotal + Number(sessionStorage.getItem('finalCashTotal')); 
    }
    for (let i: number = 0; i <= 29; i++){
      this.checks.push(this.fb.group({
        number: [undefined],
        value: [undefined],
      }));  
    }

    this.bankDepositForm.get('finalCashTotalControl').setValue(this.finalCashTotal);
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
    this.display = 'block';
    this.displayPrintButtons = 'none';
    setTimeout(()=>{
      window.print();  
    }, 200)
    
    setTimeout(()=>{
      this.display ="none"
      this.displayPrintButtons="flex";  
    }, 300)       
  }

  recalculateTotal():void{
    
  }

  resetForm(){
    //this.bankDepositForm.reset();
    this.numberChecks = 0;
    this.sumChecksTotal = 0;
    this.finalCashTotal = 0;
    this.bankDepositForm.get('finalCashTotalControl').setValue(0);
    for (let i: number = 0; i <= 29; i++){
      
      if (this.checks.at(i).value.number != null || this.checks.at(i).value.value != null) {
        this.checks.at(i).get('number').setValue(null);
        this.checks.at(i).get('value').setValue(null);
      }
    }    
  }

}
