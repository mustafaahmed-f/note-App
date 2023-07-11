import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { DeleteService } from '../delete.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  constructor(private _NotesService:NotesService , private _UserService:UserService , private _ActivatedRoute:ActivatedRoute,
    private _DeleteService:DeleteService){}


  noteID:number = 0;
  noteTitle:string = '';
  noteContent:string = '';
  userID:number= 0;
  errorMessage:string=''

  userData:any=this._UserService.userProfile.getValue();
  jsonUserData = JSON.parse(this.userData)[0]

  ngOnInit(): void {
      this.noteID=this._ActivatedRoute.snapshot.params['id'];
    this._UserService.userProfile.subscribe({
      next:()=>{this.userID = this.jsonUserData.id}
    })

    this._NotesService.getSpecificNote(this.userID,this.noteID).subscribe({
      next:(response)=>{
        console.log(response.result);

        this.noteTitle = response.result[0].title;
        this.noteContent = response.result[0].content;
      }
    })

    this._DeleteService.errMessage.subscribe({
      next:()=>{this.errorMessage = this._DeleteService.errMessage.getValue();
      console.log(this.errorMessage);
      }
    })
  }

  
  Number(str:string){
    return Number('string');
  }

  deleteNote(id:number){
    this._DeleteService.openConfirmBox(id)
  }


}
