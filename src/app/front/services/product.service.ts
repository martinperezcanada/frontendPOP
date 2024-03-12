import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts(page: number, pageSize: number, filters?: any): Observable<any> {
    let params = new HttpParams()
                  .set('page', page.toString())
                  .set('pageSize', pageSize.toString());

    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          params = params.set(key, filters[key]);
        }
      }
    }

    return this.http.get<Product[]>(this.baseUrl, { params });
  }

  getAllProductsCount(): Observable<number> {
    const url = `${this.baseUrl}/count`;
    return this.http.get<number>(url);
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}`;
    return this.http.post<Product>(url, product);
  }

  updateProduct(productId: number, productData: Product): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.put<Product>(url, productData);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
}
