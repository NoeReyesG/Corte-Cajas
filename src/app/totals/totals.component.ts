import { Component, Inject, OnInit } from '@angular/core';
import { Totals } from '../models/cash';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CashService } from '../services/cash-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {totales: BehaviorSubject<Totals>},
    private cashService: CashService,
    public dialogRef: MatDialogRef<TotalsComponent>
  ){}
  
currencies = [
  { name: 'cash', displayName: 'Efectivo', color:'bg-pink-600' },
  {name: 'cards', displayName: 'Tarjetas', color:'bg-[#219ebc]' },
  {name: 'checks', displayName: 'Cheques', color:'bg-blue-800' },
  {name: 'bank_deposits', displayName: 'Fichas de déposito', color:'bg-amber-500' },
  {name: 'credit_notes', displayName: 'Notas de Crédito', color:'bg-purple-500' },
];
  ngOnInit(): void {
  }

  printTotals():void{
    window.print();
    this.dialogRef.close();
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

 
}
