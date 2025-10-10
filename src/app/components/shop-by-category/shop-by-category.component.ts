import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgClass, NgFor } from '@angular/common';
import { map } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop-by-category',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.css'
})
export class ShopByCategoryComponent {

  selectedCategoryId: number | null = null;
  categoryList: any = [];
  visibleCategories: any = [];
  startIndex: number = 0;
  productList: any = [];
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService,private router:Router,private cart:CartService) {

  }

  ngOnInit() {
    // let categoryName = this.activatedRoute.snapshot.paramMap.get('categoryName');
    // let splitedCategory: any = categoryName?.split("-");
    // this.selectedCategoryId = splitedCategory[splitedCategory?.length - 1];
    // console.log("selectedCategoyr", this.selectedCategoryId);

    this.activatedRoute.paramMap.subscribe({
      next: (params: any) => {
        let categoryName = params.get('categoryName');
        let splitedCategory: any = categoryName?.split("-");
        this.selectedCategoryId = splitedCategory[splitedCategory?.length - 1];
         this.getCategoryListFromServer();
      }
    })

   


  }

  getCategoryListFromServer() {
    this.dataService.getDataFromServer('get-category-list').subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.categoryList = response;
          this.visibleCategories = this.categoryList.slice(this.startIndex, this.startIndex + 6);
          console.log('categoryList', this.visibleCategories);
        //  this.getDetailsByCategory(this.selectedCategoryId);
        this.getMedicineByCategory();
        }
      },

      error: (error: any) => {
        alert("Unable to pricess your request please try after some time!");
      }
    })
  }

  scrollLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.visibleCategories = this.categoryList.slice(this.startIndex, this.startIndex + 6);
    }
  }


  scrollRight() {
    if (this.startIndex + 6 < this.categoryList.length) {
      this.startIndex++;
      this.visibleCategories = this.categoryList.slice(this.startIndex, this.startIndex + 6);
    }
  }

  navigateTo(catgeory:any){
    let newCategory = catgeory.categoryName.trim().split(" ").join("-");
    this.router.navigate(['order-medicines/category',newCategory+ "-" + catgeory.categoryId])
  }

  getDetailsByCategory(catagory: any) {
    if (catagory) {
      this.selectedCategoryId = catagory.categoryId;
      this.navigateTo(catagory);
    }
  }

  getMedicineByCategory() {
    let endPoint: string = "medicine-by-category?categoryId=" + this.selectedCategoryId;
    this.dataService.getDataFromServer(endPoint).subscribe({
      next: (response: any) => {
        console.log("response", response);
        if (response && response.length > 0) {
          this.productList = response[0].medicines?.records
        } else {
          this.productList = [];
          alert("No Data Found!");
        }
      },
      error: (error: any) => {

      }
    })
  }

  addItemToCart(item:any){
    this.cart.addToCart(item);
  }

}
