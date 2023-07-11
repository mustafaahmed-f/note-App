import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserService } from '../user.service';
import { NotesService } from '../notes.service';
import { Notes } from '../notes';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';
import { DeleteService } from '../delete.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _UserService: UserService,
    private _NotesService: NotesService,
    private _ChangeDetectorRef: ChangeDetectorRef,
    private _Router: Router,
    private _DeleteService:DeleteService
  ) {}

  // Carousel

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  //==============================================

  errorMessage='';
  currentDeletingNote=0;

  userNotes: Notes[] = [];
  allNotes:Notes[]=[]
  searchError:string=''

  colors: string[] = [
    '#b8d8d8',
    '#d5e5a3',
    '#ffe28c',
    '#d6c1ab',
    '#baa9ba',
    '#ff8f5e',
    '#C38EB4',
    '#6DA5C0',
    '#F39F5A',
    '#BD83B8',
  ];



  userData: any = ''
  jsonData:any = {};

  ngOnInit(): void {

    this._UserService.userProfile.subscribe({
      next:()=>{
        if(this._UserService.userProfile.getValue()!=null){
          this.userData=this._UserService.userProfile.getValue();
          this.jsonData=JSON.parse(this.userData)[0]

        }
      }
    })

    this._NotesService.showNotes(this.jsonData.id).subscribe({
      next: (response) => {
        if(response.message=='Done'){
          this.userNotes = response.result;
          this.allNotes=response.result;
          this._NotesService.numberOfNotes.next(response.result.length)
        }

      },
      error: (err) => {
        console.log(err);
      },
    });

    this._NotesService.showSearchBtn.next(true);
    // this.randomMath()

    this._DeleteService.errMessage.subscribe({
      next:()=>{
        this.errorMessage=this._DeleteService.errMessage.getValue();
      }
    })

    this._DeleteService.currentDeletingNote.subscribe({
      next:()=>{
        this.currentDeletingNote=this._DeleteService.currentDeletingNote.getValue();
      }
    })
  }

  ngOnDestroy(): void {
    this._NotesService.showSearchBtn.next(false);
  }

  randomMath() {
    return Math.floor(Math.random() * 10);
  }

  randomNumber: number = this.randomMath();



  deleteNote(id:number){
    this._DeleteService.currentDeletingNote.next(id)
    this._DeleteService.openConfirmBox(id)
  }

  searchNote(event:Event){
    if((event.target as HTMLInputElement)?.value == ''){this.userNotes=this.allNotes
    return;}
    this._NotesService.searchOfNote(this.jsonData.id,(event.target as HTMLInputElement)?.value).subscribe({
      next:(response)=>{
        if(response.message=='Done'){
          this.userNotes=response.result
        }
        else{
          this.userNotes=[];
        }
      },
      error:()=>{
        this.searchError = 'Error'
      }
    })

  }



}
