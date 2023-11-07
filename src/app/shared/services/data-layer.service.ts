import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';

@Injectable({
    providedIn: 'root'
})
export class DataLayerService {

    constructor(
        private http: HttpClient
    ) { }


    getInvoices() {
        return this.http.get<any[]>('');
    }
    getInvoice(id) {
        return this.http.get<any[]>(''+id);
    }
    saveInvoice(invoice) {
        if(invoice.id) {
            return this.http.put<any[]>(''+invoice.id, invoice);
        } else {
            invoice.id = Utils.genId();
            return this.http.post<any[]>('', invoice);
        }
    }
    deleteInvoice(id) {
        return this.http.delete<any[]>(''+id);
    }
    getMails() {
        return this.http.get<any[]>('');
    }
    getCountries() {
        return this.http.get<any[]>('');
    }
    getProducts() {
        return this.http.get<any[]>('');
    }
}
