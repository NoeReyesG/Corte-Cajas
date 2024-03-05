import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-initial-configuration',
  templateUrl: './initial-configuration.component.html',
  styleUrls: ['./initial-configuration.component.css']
})
export class InitialConfigurationComponent implements OnInit{
  constructor(
    private _fb: FormBuilder,
    private notificationService: NotificationService,

  ){}
  
  branchs = [
    {cacId: 612, cacName: 'Plaza las Palomas', withdrawalAmount: 40000, bankDepositReference: '050000000511'}, 
    {cacId: 804, cacName:'Centro Comercial Sentura', withdrawalAmount:20000, bankDepositReference: '050000000572'}
  ]

  cashiers = [
    

    {idEmployee: 27478,  name: 'María Isabel Morales Jasso'},
    {idEmployee: 10000,  name: 'Ana Dolores García Rivera'},
    {idEmployee: 42099,  name: 'Sonia Guadalupe Mendoza Cortes'},
    {idEmployee: 56838, name: 'Gloria Angelica Mauricio Magaña'},
    {idEmployee: 61725, name: 'Martha Patricia Zamora Ramirez'},
    {idEmployee: 43115,  name: 'Noé Macario Reyes González'},
  ]
  

  configForm = this._fb.group({
    branch: ['', Validators.required],
    cashier: ['', Validators.required],
    withdrawals: [0],
  })

  ngOnInit():void {
    if (sessionStorage.getItem('configValues')){
      let configValues = sessionStorage.getItem('configValues');
      let configValuesJson = JSON.parse(configValues);
  
      this.configForm.get('cashier').setValue(configValuesJson.idEmployee);
      this.configForm.get('branch').setValue(configValuesJson.cacId);
      this.configForm.get('withdrawals').setValue(configValuesJson.withdrawals);
    }

  }

  saveConfig():void{
    if (this.configForm.valid){
      let idCashier: number = Number(this.configForm.get('cashier').value);
      let idBranch: number = Number(this.configForm.get('branch').value)
      let selectedCashier = this.cashiers.find(({idEmployee}) => idEmployee === idCashier);
      let selectedBranch = this.branchs.find(({cacId})=> cacId === idBranch);

      let configValues = {
        ...selectedBranch,
        ...selectedCashier,
      }
      configValues['withdrawals'] = Number(this.configForm.get('withdrawals').value);
    
      let configValuesString = JSON.stringify(configValues);
      
      sessionStorage.setItem('configValues', configValuesString);
      this.notificationService.showSuccess('configuración exitosa, puedes ir a calcular efectivo');  
    }
    else{
      this.notificationService.showError('Revisar datos');
      return;
    }
  }

  selectBranch(cacId: number):void {
    console.log(cacId);
  }

}
