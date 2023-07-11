import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private _UserService:UserService,
    private _NotesService:NotesService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router){

  }

  userData:any=''
  jsonUserData:any = ''
  userAge:number=0;
  userName:string='';
  userEmail:string='';
  userPassword:string='';
  userID:number=0


  ngOnInit(): void {
    this._UserService.userProfile.subscribe({
      next:()=>{
        if(this._UserService.userProfile.getValue()!=null){
          this.userData=this._UserService.userProfile.getValue();
        this.jsonUserData = JSON.parse(this.userData)[0];
        this.userName=this.jsonUserData.name;
        this.userAge=this.jsonUserData.age;
        this.userEmail=this.jsonUserData.email
        this.userID=this.jsonUserData.id

        console.log(this.userName);
        }

      }
    })

    let dataForpassword={
      email : this.userEmail
    }

    this._UserService.getPassword(dataForpassword).subscribe({
      next:(response)=>{
        this.userPassword = response.result[0].password;



      }
    })
  }

  errMessage:string=''

  updateUserForm=new FormGroup({
    name:new FormControl(this.userName,[Validators.minLength(3),Validators.maxLength(15),Validators.pattern(/^[A-Za-z_ ]{0,}$/)]),
    email:new FormControl(this.userEmail,Validators.pattern(/^[A-Za-z0-9]{4,}@[a-z]{3,}[.][a-z]{2,3}$/)),
    age:new FormControl (0, Validators.maxLength(2)),
    password:new FormControl(this.userPassword,Validators.pattern(/^[A-Z][A-Za-z0-9]{8,12}/)),

  })

  updateUser(){
    let email=this.userEmail;
    let password:any = '';
    let name:any = '';
    let age:any = 0;

    if(this.updateUserForm.get('password')?.value==''){password = this.userPassword}
    else{password = this.updateUserForm.get('password')?.value}

    if(this.updateUserForm.get('name')?.value==''){name=this.userName}
    else{name= this.updateUserForm.get('name')?.value}

    if(this.updateUserForm.get('age')?.value==0 || this.updateUserForm.get('age')?.value == null){age = this.userAge}
    else{age= this.updateUserForm.get('age')?.value}


    let data={
      email : email,
      password:password,
      age:age,
      name:name
    }

    let localstorageData={
      id : this.userID,
      email : email,
      age:age,
      name:name
    }

    this._UserService.update(data).subscribe({
      next:(response)=>{
        if(response.message == 'updated successfully'){
          this.errMessage=''
          alert(`${response.message}`);
          localStorage.removeItem('userInfoFornotes')
          let stringfiedData = JSON.stringify([localstorageData]);
          localStorage.setItem('userInfoFornotes',stringfiedData);
          let userData:any = localStorage.getItem('userInfoFornotes')
          this._UserService.userProfile.next(userData)

          this._Router.navigate(['/home']);
        }
        else{
          this.errMessage='Failed to update user';

        }
      },
      error:()=>{
        this.errMessage='Error';
      }
    })
  }






}
