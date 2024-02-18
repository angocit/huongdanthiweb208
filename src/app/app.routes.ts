import { Routes } from '@angular/router';
import { AddproductComponent } from './component/addproduct/addproduct.component';
import { ProductsComponent } from './component/products/products.component';
import { EditProductsComponent } from './component/edit-products/edit-products.component';

export const routes: Routes = [
    {path: 'add-product', component:AddproductComponent},
    {path: 'product-list', component:ProductsComponent},
    {path: 'edit-product/:id', component:EditProductsComponent}
];
