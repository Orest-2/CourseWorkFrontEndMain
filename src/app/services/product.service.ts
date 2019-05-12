import { Injectable } from '@angular/core';
import { Product } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = `${appConfig.API_BASE_URL}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ success: boolean; products: Product[] }> {
    return this.http.get<{ success: boolean; products: Product[] }>(this.productUrl);
  }

  get(id: number) {
    return this.http.get<{ success: boolean; product: Product }>(
      `${this.productUrl}/${id}`
    );
  }

  create(product: Product) {
    return this.http.post<{ success: boolean; product: Product }>(
      this.productUrl,
      product
    );
  }

  update(id: number, product: Product) {
    return this.http.put<{ success: boolean; product: Product }>(
      `${this.productUrl}/${id}`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete<{ success: boolean }>(`${this.productUrl}/${id}`);
  }
}
