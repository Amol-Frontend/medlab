import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order } from '../cart/cart.component';
import { AddPatientFormComponent } from '../add-patient-form/add-patient-form.component';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any; // Declare bootstrap if not using a dedicated library

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [AddPatientFormComponent, NgIf, NgFor, FormsModule,DecimalPipe],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {

  order: Order | null = null;
  showPatientForm: boolean = false;
  loggedInUserId: string | null = null;
  patientList: any = [];
  id: number | null = null;
  selectedPatientDetls: any = {};
  @ViewChild('addPatientModal', { static: false }) addPatientModal!: ElementRef
  bootstrapModal: any;



  constructor(private cart: CartService, private dataService: DataService,private router:Router) {

  }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem("userId");
    this.order = this.cart.getOrder();
    this.getPatientList();
  }

  getPatientList() {
    if (this.loggedInUserId) {
      const endPoint = `patients?userId=${this.loggedInUserId}`;
      this.dataService.getDataFromServer(endPoint).subscribe({
        next: (response: any) => {
          if (response) {
            this.patientList = response[0].patientList;
            this.id = response[0].id;
          }
        }
      })
    }
  }


  selectedPatientId: number | null = null;
  selectPatient(index: number) {
    this.selectedPatientId = index;
    this.selectedPatientDetls = this.patientList[index];

  }

  navigateTo() {
    if (this.order) {
      this.order.fullName = this.selectedPatientDetls.patientName;
      this.order.emailId = this.selectedPatientDetls.email;
      this.order.mobileNo = this.selectedPatientDetls.mobileNo
      this.order.relation = this.selectedPatientDetls.relationShipType
      this.order.gender = this.selectedPatientDetls.gender;

      this.cart.setOrder(this.order);

      this.router.navigate(['/order-summary']);
    }

    //this.router.navigate(['/'])
  }


  getModalStatus(flag:any){
    if(flag){
      this.bootstrapModal.hide();
      this.getPatientList();
    }
  }

  addPatientForm() {
    this.showPatientForm = true;
  }

    ngAfterViewInit() {
    this.bootstrapModal = new bootstrap.Modal(this.addPatientModal.nativeElement);
  }

}
