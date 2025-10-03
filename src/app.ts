// src/app.ts
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Products';

    config.map([
      {
        route: ['', 'products'],
        name: 'product-list',
        moduleId: PLATFORM.moduleName('./product-list'),
        title: 'Product List'
      },
      // New route for the "create" page
      {
        route: 'products/new',
        name: 'product-create',
        moduleId: PLATFORM.moduleName('./product-form'),
        title: 'New Product'
      },
      // New route for the "edit" page, with an ID parameter
      {
        route: 'products/:id',
        name: 'product-edit',
        moduleId: PLATFORM.moduleName('./product-form'),
        title: 'Edit Product'
      }
    ]);
  }
}
