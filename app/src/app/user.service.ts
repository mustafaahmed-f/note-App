import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('userInfoFornotes') != null){
      let userData:any = localStorage.getItem('userInfoFornotes')
      this.userProfile.next(userData)
    }
    else{
      this.userProfile.next(null)
    }
   }

   userData(){
    if(localStorage.getItem('userInfoFornotes') != null){
      let userData:any = localStorage.getItem('userInfoFornotes')
      this.userProfile.next(userData)
    }
   }

  userProfile = new BehaviorSubject(null);


  login(data:FormGroup):Observable<any>{
    return this._HttpClient.post(`http://localhost:5000/users/signIn` , data)
  }

  register(data:any):Observable<any>{
    return this._HttpClient.post(`http://localhost:5000/users/signUp` , data)
  }

  update(data:any):Observable<any>{
    return this._HttpClient.put(`http://localhost:5000/users/update`,data)
  }

  delete(id:number):Observable<any>{
    return this._HttpClient.delete<any>(`http://localhost:5000/users/delete/${id}`,{
      headers:new HttpHeaders({
        "Content-Type":'application/json',
      })
     })
  }

  getPassword(data:any):Observable<any>{
    return this._HttpClient.post(`http://localhost:5000/users/getpassword`,data)
  }


}
