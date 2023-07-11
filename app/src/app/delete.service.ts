import { UserService } from './user.service';
import { NotesService } from './notes.service';
import { Injectable } from '@angular/core';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private _NotesService:NotesService , private _UserService:UserService) { }

  errMessage=new BehaviorSubject('')
  currentDeletingNote = new BehaviorSubject(0)

  userData: any = this._UserService.userProfile.getValue();
  jsonData = JSON.parse(this.userData)[0];

  openConfirmBox(id: number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Note deletion');
    newConfirmBox.setMessage('Are you sure you want to delete note ?');

    // Choose layout color type
    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      buttonPosition: 'center', // optional
    });

    newConfirmBox.setButtonLabels('Yes, Delete', "No, Don't delete");

    let data:any={
      "id" : id,
    "user_id": this.jsonData.id
          }

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.clickedButtonID) {
        if (resp.success) {
            console.log(data);

            this._NotesService.deleteNote(data).subscribe({
              next:(response)=>{
                if(response.message=="Note deleted successfully !"){
                  this.errMessage.next("")

                  console.log(response.message);
                  window.location.reload();
                }
                else{
                  this.errMessage.next(`Failed to delete note`)
                }
              },
              error:(err)=>{console.log(err);
              },
              complete:()=>{console.log("Completed");
              }
            })
        }
      }
    });
  }
}
