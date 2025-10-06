import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-medicine-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './medicine-home.component.html',
  styleUrl: './medicine-home.component.css'
})
export class MedicineHomeComponent {

  categoryList: any = [];
  visibleCategories : any = [];

  cardWidth: number = 150;
  totalCards:number = 6 ;

  startIndex: number = 0 ;

  @ViewChild('cardContainer',{static:false}) cardContainer!: ElementRef;


  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getDataFromServer('get-category-list').subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.categoryList = response;
          this.visibleCategories = this.categoryList.slice(this.startIndex , this.startIndex + 6);
          console.log('categoryList', this.categoryList);
        }
      },

      error: (error: any) => {
        alert("Unable to pricess your request please try after some time!");
      }
    })
  }

  // scrollLeft() {
  //   console.log('scrollLeft');
  //   if (this.cardContainer) {
  //      console.log("scrollLeft width",this.cardContainer.nativeElement.scrollRight)

  //     this.cardContainer.nativeElement.scrollLeft += Number(this.cardWidth);
  //            console.log("scrollLeft width after",this.cardContainer.nativeElement.scrollRight)

  //   }
  // }

  // scrollRight() {
  //       console.log('scrollRight');
  //   if (this.cardContainer) {
  //                  console.log("scrollRightwidth before",this.cardContainer.nativeElement.scrollRight)

  //     this.cardContainer.nativeElement.scrollRight -= Number(this.cardWidth);

  //            console.log("scrollRightwidth after",this.cardContainer.nativeElement.scrollRight)
  //   }
  // }


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

}
