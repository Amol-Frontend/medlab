import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap } from 'rxjs';
import { NgFor } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,NgFor,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchText: string = "";
  searchResults: any = [];

  subject = new Subject();

  subscription!:Subscription

  constructor(private dataService: DataService,private router:Router) {

  }

  ngOnInit() {
this.subscription =   this.subject.pipe(debounceTime(300), distinctUntilChanged(), switchMap((searchKey: any) => {
      if (searchKey) {
        return this.dataService.getDataFromServer("medicines?q=" + this.searchText)
      } else {
        return of([])
      }

    })).subscribe((response: any) => {
        if(response && response.length > 0 && this.searchText){
          this.searchResults = response
        }else {
          this.searchResults = [];
        }
    });
  }



  searchMedicines() {
    if(!this.searchText){
      this.searchResults = [];
      return;
    }
    this.subject.next(this.searchText);
  }

  redirectTo(){
    this.router.navigate(['/search-medicine',this.searchText]);
    this.searchResults = [];
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
