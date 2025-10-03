import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
  export class ProductList{
      products = [];
      constructor(private api: ApiService){}
      async attached(){
        this.products = await this.api.getProducts();
        }
      async deleteProduct(id: string){
        if(confirm('Are you sure to delete this product')){
          await this.api.deleteProduct(id);
          this.products = this.products.filter(p => p.id !== id);
       }
    }
  }
