import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-delivery-address',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './delivery-address.component.html',
  styleUrl: './delivery-address.component.css'
})
export class DeliveryAddressComponent {

  addressForm!:FormGroup
 loggedInUserId:string | null = null; 
 addressList:any = [];


 @Input()
 addNewAddress!:boolean;

 @Output()
 selectedAddressEmit : EventEmitter<any> = new EventEmitter();

 id:number | null = null;
  constructor(private fb:FormBuilder,private dataService:DataService){

  }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem("userId");
    this.initializeForm();
    this.getAddressList();
  }
  getAddressList() {
    if (this.loggedInUserId) {
      const endPoint = `address?userId=${this.loggedInUserId}`;
      this.dataService.getDataFromServer(endPoint).subscribe({
        next: (response: any) => {
          if (response) {
            this.addressList = response[0].addressList;
           this.id = response[0].id;
          }
        }
      })
    }

  }

  initializeForm() {
    this.addressForm = this.fb.group({
      line1 : [''],
      line2: [''],
      city : [''],
      state : [''],
      pincode : ['']
    })
  }

  saveAddress(){
    console.log("address",this.addressForm.value);

    
    const reqestObj = {
        userId : this.loggedInUserId,
        addressList : [...this.addressList,{...this.addressForm.value}]
    }


    if (this.id && this.addressList && this.addressList.length > 0) {
      let endPoint = "address/"+this.id
      this.dataService.putDataToerver(endPoint, reqestObj).subscribe({
        next: (response: any) => {
          console.log("response");
        },
        error: (error: any) => {

        }
      })
    } else {
      this.dataService.postDataFromServer("address", reqestObj).subscribe({
        next: (response: any) => {
          console.log("response");
        },
        error: (error: any) => {

        }
      })
    }
 

  }

  selectAddress(address:any){
   this.selectedAddressEmit.emit(address);
  }
}

