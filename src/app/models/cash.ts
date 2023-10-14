import { FormControl } from "@angular/forms";

export type CurrencyType ='checks'| 'cards' | 'credit_notes' | 'bank_deposits';

export interface CardFormElement {
    cardValue: FormControl<number>
}