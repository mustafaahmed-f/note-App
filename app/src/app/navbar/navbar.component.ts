import { NotesService } from './../notes.service';
import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchBtn:boolean=false;
  islogged:boolean = false;

  constructor(private _UserService:UserService , private _Router:Router , private _NotesService:NotesService ,private elem: ElementRef,
    @Inject(DOCUMENT) private _document: HTMLDocument){

  }

  userData:any=''
  jsonUserData:any = ''
  userAge:number=0;
  numberOfNotes:number=0;
  userName:string='';
  userID:number=0;
  isLogged:boolean=false

  ngOnInit(): void {

    this._UserService.userProfile.subscribe({
      next:()=>{
        if(this._UserService.userProfile.getValue()!=null){
          this.islogged=true;
          this.userData=this._UserService.userProfile.getValue();
          this.jsonUserData = JSON.parse(this.userData)[0];
          this.userName=this.jsonUserData.name;
          this.userAge=this.jsonUserData.age;

          this.userID=this.jsonUserData.id;

          this._NotesService.showNotes(this.userID).subscribe({
            next: (response) => {
              if(response.message=='Done'){
                this.numberOfNotes=response.result.length
              }


            },
            error: (err) => {
              console.log(err);
            },
          });

        }
        else{
          this.islogged=false;
        }
      }
    })

    this._NotesService.showSearchBtn.subscribe({
      next:()=>{
        this.searchBtn=this._NotesService.showSearchBtn.getValue();
      }
    })


  }


  showProfileController:boolean=false;
  errMessage:string=''

  searchNotes(event:Event){
    console.log(event.target);

  }

  logout(){
    this._Router.navigateByUrl('/home')
    localStorage.removeItem('userInfoFornotes');
    this._UserService.userProfile.next(null);
    this.islogged=false;
  }

  showProfile(){
    this._document.querySelector('.collapse')?.classList.add("collapsing")
    if(this.showProfileController==false){
      this.showProfileController=true;
    }
    else{this.showProfileController=false
    }
  }

  @HostListener('window:click', ['$event']) onDocumentClick(event: any) {
    let card = this._document.querySelector('.card')
    let profile = this._document.querySelector('.profile')
    if(event.target == card || event.target == profile){

      this.showProfileController = true;
    }
    else{
      this.showProfileController=false;
      this._document.querySelector('.collapse')?.classList.remove("collapsing")

    }
    event.stopPropagation()
  }

  updateUser(){
      this.showProfileController=false;
  }

  // Deleting user :

  openConfirmBox(id: number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('User deletion');
    newConfirmBox.setMessage('Are you sure you want to delete user ?');

    // Choose layout color type
    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      buttonPosition: 'center', // optional
    });

    newConfirmBox.setButtonLabels('Yes, Delete', "No, Don't delete");


    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.clickedButtonID) {
        if (resp.success) {
            console.log();

            this._UserService.delete(this.jsonUserData.id).subscribe({
              next:(response)=>{
                if(response.message=='Deleted successfully'){
                  this.errMessage=''
                  localStorage.removeItem('userInfoFornotes');
                  this._Router.navigate(['/logIn'])
                }
                else{
                  this.errMessage=`Delete Failed`
                }
              },
              error:(err)=>{console.log(err);
                this.errMessage=`Error ...`
              },
              complete:()=>{console.log("Completed");
              }
            })
        }
      }
    });
  }

  deleteUser(){
    let id = this.jsonUserData.id;
    this.openConfirmBox(id);
  }

}
