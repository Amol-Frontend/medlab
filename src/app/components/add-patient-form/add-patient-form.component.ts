import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './add-patient-form.component.html',
  styleUrl: './add-patient-form.component.css'
})
export class AddPatientFormComponent {

  patientForm!:FormGroup;
  relationShipList : any = [
    {value : 'brother', viewValue : 'Brother'},
    {value : 'friend', viewValue : 'Friend'},
    { value : 'sister', viewValue : 'Sister'}

  ]

  genderList : any = [
      {value : 'male', viewValue : 'Male'},
    {value : 'female', viewValue : 'Female'},
    { value : 'other', viewValue : 'Other'}
  ]
 loggedInUserId:string | null = null; 

@Output()
closeModal : EventEmitter<boolean> = new EventEmitter();

  constructor(private fb:FormBuilder,private dataService:DataService){

  }

  ngOnInit(){
    this.loggedInUserId = localStorage.getItem("userId");
   this.initializeForm();
   this.getPatientList();

  }

  patientList:any = [];
id:number | null = null ;
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

    initializeForm() {
    this.patientForm = this.fb.group({
      patientName : [''],
      email: [''],
      mobileNo : [''],
      relationShipType : [''],
      gender : [''],
      isPatientSelected: [false]
    })
  }

  addPatient(){
console.log("patient",this.patientForm.value);

    
    const reqestObj = {
        "userId" : this.loggedInUserId,
        "patientList" : [...this.patientList,{...this.patientForm.value}]
    }


    if (this.id && this.patientList && this.patientList.length > 0) {
      let endPoint = "patients/"+this.id
      this.dataService.putDataToerver(endPoint, reqestObj).subscribe({
        next: (response: any) => {
          console.log("response");
          this.closeModal.emit(true);
        },
        error: (error: any) => {

        }
      })
    } else {
      this.dataService.postDataFromServer("patients", reqestObj).subscribe({
        next: (response: any) => {
          console.log("response");
           this.closeModal.emit(true);
        },
        error: (error: any) => {

        }
      })
    }
  }
}
