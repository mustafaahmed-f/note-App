import { Notes } from './notes';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagContentType } from '@angular/compiler';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) {

   }

    headers = new HttpHeaders();
    header = this.headers.set('Content-Type', 'application/json; charset=utf-8');

   showSearchBtn = new BehaviorSubject(false)
   delete = new BehaviorSubject(false)
   numberOfNotes = new BehaviorSubject(0)


   addNote(data:any):Observable<any>{
    return this._HttpClient.post(`http://localhost:5000/notes/add`,data)
   }

   showNotes(userID : number):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/notes/${userID}`)
   }

   searchOfNote(userID :string , title:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/notes/search/${userID}/${title}`)
   }

   getSpecificNote(userID:number , note_id:number):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/notes/${userID}/${note_id}`)
   }

   updateNote(data:any):Observable<any>{
   return this._HttpClient.put(`http://localhost:5000/notes/update`,data)
   }

   deleteNote(data:any):Observable<any>{
   return this._HttpClient.delete<any>(`http://localhost:5000/notes/delete/${data.user_id}/${data.id}`,{
    headers:new HttpHeaders({
      "Content-Type":'application/json',
    })
   }

   )
   }
}
