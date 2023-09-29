import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Cash } from "../models/cashModel";
import { Observable } from "rxjs";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class cashService {
    constructor(private http: HttpClient){}

    createCashRegister(cash: Cash): Observable<Object>{
        console.log(cash);
        console.log(`${API_URL}/v1/cash/create`)
        return this.http.post(`${API_URL}/v1/cash/create`, cash);
    }
}