import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private _UserService:UserService , private _Router:Router){

  }

  ErrorMessage:string=''

  RegisterForm = new FormGroup({
    name: new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(15),Validators.pattern(/^[A-Za-z_ ]{0,}$/)]),
    email:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z0-9]{4,}@[a-z]{3,}[.][a-z]{2,3}$/)]),
    age:new FormControl (null, [Validators.required,Validators.maxLength(2),Validators.pattern(/^[1-9][0-9]$/)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][A-Za-z0-9]{8,12}/)]),
  })

  ngOnInit(): void {

  }

  checkRePassword(){
    if (this.RegisterForm.get('password')?.value==this.RegisterForm.get('rePassword')?.value){
      return false;
    }
    else{
      return true
    }
  }


  register(data:FormGroup){
    this._UserService.register(data.value).subscribe({
      next:(response)=>{
        if(response.message == 'signed up successfully'){
          this.ErrorMessage=''
          alert('signed up successfully');
          this._Router.navigate(['/logIn']);
        }
        else if (response.message == 'User already exists'){
          this.ErrorMessage=`${response.message}`
        }
        else{
          this.ErrorMessage='Failed to sign up'
        }
      }
    })
  }
}
