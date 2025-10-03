import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { ApiService } from './api-service';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

@inject(ApiService, Router)
export class ProductForm {
  product: Product = { name: '', description: '', price: 0, category: '' };
  isNew: boolean = true;

   constructor(private api: ApiService, private router: Router) { }

   async activate(params) {
       if (params.id) {
         // If an ID is present in the URL, it's an "edit"
         this.isNew = false;
         this.product = await this.api.getProduct(params.id);
       }
     }
   async save() {
       if (this.isNew) {
         await this.api.createProduct(this.product);
       } else {
         await this.api.updateProduct(this.product.id, this.product);
       }
       // After saving, navigate back to the product list page
       this.router.navigate('');
     }
   }
