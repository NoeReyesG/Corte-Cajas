import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-initial-configuration',
  templateUrl: './initial-configuration.component.html',
  styleUrls: ['./initial-configuration.component.css']
})
export class InitialConfigurationComponent {
  constructor(
    private _fb: FormBuilder,
    private notificationService: NotificationService,

  ){}
  
  branchs = [
    {cacId: 612, cacName: 'Plaza las Palomas', withdrawalAmount: 40000, bankDepositReference: '050000000512'}, 
    {cacId: 804, cacName:'Centro Comercial Sentura', withdrawalAmount:20000, bankDepositReference: '050000000572'}
  ]

  cashiers = [
    {idEmployee: 43115,  name: 'Noé Macario Reyes González'},
    {idEmployee: 27478,  name: 'María Isabel Morales Jasso'},
    {idEmployee: 42099,  name: 'Sonia Guadalupe Mendoza Cortes'},
    {idEmployee: 56838, name: 'Gloria Mauricio Cortes'},
  ]
  

  configForm = this._fb.group({
    branch: ['', Validators.required],
    cashier: ['', Validators.required],
    withdrawals: [0],
  })

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
