import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicineHomeComponent } from './components/medicine-home/medicine-home.component';

export const routes: Routes = [
    { path : 'home' , component :HomeComponent},
    { path : 'medicine-home', component : MedicineHomeComponent},
    { path : '', redirectTo : '/home', pathMatch : 'full'}
];
