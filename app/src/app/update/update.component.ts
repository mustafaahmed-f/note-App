import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  constructor(private _UserService:UserService,
    private _NotesService:NotesService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router){

  }



  userData:any=this._UserService.userProfile.getValue();
  jsonUserData = JSON.parse(this.userData)[0]


  errorMessage:string=''
  noteID:number = Number(this._ActivatedRoute.snapshot.params['id'])
  userID:number = this.jsonUserData.id;
  noteTitle:string=''
  noteContent:string=''



  ngOnInit(): void {
      this._NotesService.getSpecificNote(this.userID,this.noteID).subscribe({
        next:(response)=>{
          this.noteTitle=response.result[0].title;
          this.noteContent=response.result[0].content;
        }
      })
  }

  updateForm = new FormGroup({
    title:new FormControl(this.noteTitle,[Validators.minLength(1),Validators.pattern(/^[A-Za-z][A-Za-z0-9_ ]{1,}$/),Validators.maxLength(24)]),
    content:new FormControl(this.noteContent,[Validators.minLength(10),Validators.pattern(/^[\w\W\s]{1,}$/)]),
  })


  update(){
    let id:number=this.noteID;
    let title:any='';
    let content:any='';
    let user_id:number=this.userID;

    if(this.updateForm.get('title')?.value == ''){title=this.noteTitle}
    else{title=this.updateForm.get('title')?.value}
    if(this.updateForm.get('content')?.value == ''){content=this.noteContent}
    else{content=this.updateForm.get('content')?.value}

    let data:any = {
      id:id,
      title:title,
      content:content,
      user_id:user_id
    }


    this._NotesService.updateNote(data).subscribe({
      next:(response)=>{
        if(response.message == "Note updates successfully !"){
          this.errorMessage=''
          alert(`${response.message}`)
          this._Router.navigate(['/home'])
        }
        else{
          this.errorMessage = `${response.message}`
        }
      }
    })
  }
}
