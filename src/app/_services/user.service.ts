import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Product } from '@app/_models';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })
export class UserService {
    private credUrl = 'http://localhost:3001/credentials/';
    private productUrl = 'http://localhost:3001/products/';
    constructor(private http: HttpClient) { }

    

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl);
    }

    addProducts(prdt: Product) {
        return this.http.post<Product>(this.productUrl, prdt, httpOptions);
    }

    deleteProduct (id: number): Observable<{}> {
        const url = `${this.productUrl}${id}`;
        return this.http.delete(url, httpOptions);
    }
    updateProduct (prdt: Product, id:number): Observable<Product> {
        // console.log(id);
        return this.http.put<Product>(this.productUrl+id, prdt, httpOptions);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
    register(user: User) {
        return this.http.post<User>(this.credUrl, user, httpOptions);
    }
}