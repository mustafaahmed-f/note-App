import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/notes.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private _UserService:UserService,
    private _NotesService:NotesService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router){

  }


  userData:any=this._UserService.userProfile.getValue();
  jsonUserData = JSON.parse(this.userData)[0]


  errorMessage:string=''

  userID:number = this.jsonUserData.id;
  noteTitle:string=''
  noteContent:string=''

  addForm = new FormGroup({
    title:new FormControl(null,[Validators.minLength(1),Validators.pattern(/^[A-Za-z][A-Za-z0-9_ ]{1,}$/),Validators.maxLength(24),Validators.required]),
    content:new FormControl(this.noteContent,[Validators.minLength(10),Validators.pattern(/[\w\W\s]{1,}$/),Validators.required]),
    user_id:new FormControl(this.userID)
  })


  add(data:FormGroup){
    this._NotesService.addNote(data.value).subscribe({
      next:(response)=>{
        if(response.message=='Note added successfully !'){
          this.errorMessage='';
          alert(`${response.message}`);
          this._Router.navigate(['/home'])
        }
        else{
          this.errorMessage=`${response.message}`
        }
      }
    })
  }
}
