import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Totals } from '../models/cash';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CashService } from '../services/cash-service';
import { BehaviorSubject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit, OnDestroy{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {totales: BehaviorSubject<Totals>},
    private cashService: CashService,
    public dialogRef: MatDialogRef<TotalsComponent>
  ){}

  cashTotal: number;  
  currencies = [
    {name: 'cash', displayName: 'Efectivo', color:'bg-pink-600' },
    {name: 'cards', displayName: 'Tarjetas', color:'bg-[#219ebc]' },
    {name: 'checks', displayName: 'Cheques', color:'bg-blue-800' },
    {name: 'bank_deposits', displayName: 'Fichas de déposito', color:'bg-amber-500' },
    {name: 'credit_notes', displayName: 'Notas de Crédito', color:'bg-purple-500' },
  ];

  ngOnInit(): void {
    this.cashTotal = this.cashService.totals.value.cash;
  }

  printTotals():void{
    window.print();
    this.dialogRef.close();
  }

  finalMoneyWithdrawn(event: MatCheckboxChange){
    if (event.checked === true){
      this.cashService.totals.value.cash = 0;
    }
    else{
      this.cashService.totals.value.cash = this.cashTotal;
    }

  }
  closeDialog(): void{
    this.dialogRef.close();
  }

  ngOnDestroy(): void{
    this.cashService.totals.value.cash = this.cashTotal;
  }


 
}
