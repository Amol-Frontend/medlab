import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-medicine-results',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search-medicine-results.component.html',
  styleUrl: './search-medicine-results.component.css'
})
export class SearchMedicineResultsComponent {

    searchResultText:string| null=null;
    medicineList:any = [];
    constructor(private activateRoute:ActivatedRoute,private dataService:DataService){
       
    }

    ngOnInit(){
     this.searchResultText =  this.activateRoute.snapshot.paramMap.get('drugName');

     this.dataService.getDataFromServer("medicines?q=" + this.searchResultText).subscribe({
      next : (response:any)=> {
       if(response && response.length > 0){
        this.medicineList = response;
        console.log("response",this.medicineList);
       }
      },
      error : (error:any)=> {

      }
     })
    }

    addItemToCart(medicine:any){
      
    }
  
}
