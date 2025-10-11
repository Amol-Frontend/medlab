import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicineHomeComponent } from './components/medicine-home/medicine-home.component';
import { SearchMedicineResultsComponent } from './components/search-medicine-results/search-medicine-results.component';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path : 'home' , component :HomeComponent},
    { path : 'medicine-home', component : MedicineHomeComponent},
     { path : 'search-medicine/:drugName', component : SearchMedicineResultsComponent},
     {path : 'order-medicines/category/:categoryName',component : ShopByCategoryComponent},
     { path : 'cart', component : CartComponent},
    { path : '', redirectTo : '/home', pathMatch : 'full'}
];
