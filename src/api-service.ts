// src/api-service.ts

import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

const BASE_URL = 'http://localhost:9090/products';

@inject(HttpClient)
export class ApiService {
  constructor(private http: HttpClient) {
    // We configure the HttpClient to always expect JSON
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
    });
  }

  getProducts() {
    return this.http.fetch(BASE_URL).then(response => response.json());
  }

  getProduct(id: string) {
    return this.http.fetch(`${BASE_URL}/${id}`).then(response => response.json());
  }

  createProduct(product) {
    return this.http.fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(product)
    }).then(response => response.json());
  }

  updateProduct(id: string, product) {
    return this.http.fetch(`${BASE_URL}/${id}`, {
      method: 'put',
      body: JSON.stringify(product)
    }).then(response => response.json());
  }

  deleteProduct(id: string) {
    return this.http.fetch(`${BASE_URL}/${id}`, {
      method: 'delete'
    });
  }
}
