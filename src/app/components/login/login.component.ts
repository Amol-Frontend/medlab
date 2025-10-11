import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  mobileNumber:number | null = null ;
  OtpGenerated:string | null = null ;
  shotOtpField:boolean = false;
  otp:string | null = null ;

  otpTimer : number | null = null;
  otpLimit : number = 60;
  sub!:Subscription


  @Output()
  loginStatus  = new EventEmitter();

  constructor(private dataService:DataService){

  }

  getOtp() {
    this.shotOtpField = true;
    this.OtpGenerated = this.genereateOtp();
    console.log("otp", this.OtpGenerated);

    this.sub = interval(1000).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.otpTimer = this.otpLimit - resp;
        if (this.otpTimer == 0) {
          this.sub.unsubscribe();
        }
      }
    })
  }


  verifyOtp() {
    if (this.OtpGenerated == this.otp) {
      //unsubscribe obs
      this.sub.unsubscribe();
      this.shotOtpField = false;
      this.otpTimer = null;

      
      let reqObj = {
        "mobileNumber": this.mobileNumber,
        "isValidOtp": true
      }

      this.dataService.postDataFromServer("users", reqObj).subscribe({
        next: (response: any) => {
          if (response) {
            const authToken = "ebcdef1223bhasher122331dadadwewq";
            localStorage.setItem("authToken", authToken);
           this.loginStatus.emit(true);
          }
        }
      })
    }
  }

  editMobileNo(){
     this.shotOtpField = false ;
     this.OtpGenerated = null;
  }

  genereateOtp(){
   return  Math.floor(1000 + Math.random() * 9000).toString();
  }
}
