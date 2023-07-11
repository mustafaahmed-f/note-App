import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router ,Event } from '@angular/router';
import { UserService } from './user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _Router:Router , private _UserService:UserService ,private spinner: NgxSpinnerService){
    this._Router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinner.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  title = 'note-app';


  ngOnInit(): void {
    this._UserService.userProfile.subscribe({
      next:()=>{
        if(this._UserService.userProfile.getValue()==null){
          this._Router.navigateByUrl('/logIn')
        }

      }
    })






  }


}
