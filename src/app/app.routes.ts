import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicineHomeComponent } from './components/medicine-home/medicine-home.component';
import { SearchMedicineResultsComponent } from './components/search-medicine-results/search-medicine-results.component';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';

export const routes: Routes = [
    { path : 'home' , component :HomeComponent},
    { path : 'medicine-home', component : MedicineHomeComponent},
     { path : 'search-medicine/:drugName', component : SearchMedicineResultsComponent},
     {path : 'order-medicines/category/:categoryName',component : ShopByCategoryComponent},
    { path : '', redirectTo : '/home', pathMatch : 'full'}
];
