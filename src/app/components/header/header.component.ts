import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
declare var bootstrap: any; // Declare bootstrap if not using a dedicated library

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, NgIf,LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchText: string = "";
  searchResults: any = [];

  subject = new Subject();

  subscription!: Subscription;
  cartCount: number | null = null;

  isUserLoggedIn : boolean = false ;

  @ViewChild('loginModal', { static: false }) loginModal!: ElementRef
  bootstrapModal: any;
  constructor(private dataService: DataService, private router: Router, private cartService: CartService, private auth: AuthService) {

  }

  ngOnInit() {
    this.cartCount = this.cartService.getCartDataFromLocalStorage().length;
    this.cartService.cartCountObs.subscribe((count: any) => {
      this.cartCount = count;
    })

    this.subscription = this.subject.pipe(debounceTime(300), distinctUntilChanged(), switchMap((searchKey: any) => {
      if (searchKey) {
        return this.dataService.getDataFromServer("medicines?q=" + this.searchText)
      } else {
        return of([])
      }

    })).subscribe((response: any) => {
      if (response && response.length > 0 && this.searchText) {
        this.searchResults = response
      } else {
        this.searchResults = [];
      }
    });


     this.isUserLoggedIn = this.auth.isLoggedIn()
  }

  searchMedicines() {
    if (!this.searchText) {
      this.searchResults = [];
      return;
    }
    this.subject.next(this.searchText);
  }

  redirectTo() {
    this.router.navigate(['/search-medicine', this.searchText]);
    this.searchResults = [];
  }

  openCart() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.bootstrapModal.show();
    }
  }

  getLoginStatus(event:any){
    this.isUserLoggedIn = event;
    if(this.isUserLoggedIn){
      this.bootstrapModal.hide();
      this.router.navigate(['/cart']);
    }
  }

  logout(){
    this.isUserLoggedIn = false;
    this.auth.logout();
    this.router.navigate(['/medicine-home']);
  }

  ngAfterViewInit() {
    this.bootstrapModal = new bootstrap.Modal(this.loginModal.nativeElement);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
