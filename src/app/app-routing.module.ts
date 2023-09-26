import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';

const routes: Routes = [
  {path: 'efectivo', component: EfectivoComponent},
  {path: 'tarjetas', component: TarjetasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
