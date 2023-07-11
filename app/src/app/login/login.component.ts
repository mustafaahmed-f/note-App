import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { FormGroup ,FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ErrorMessage:string=''

  constructor(private _UserService:UserService , private _Router:Router){}

  LoginForm = new FormGroup ({
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })

  login(data:FormGroup){
    this._UserService.login(data.value).subscribe({
      next:(response)=>{
        if(response.message=='Signed in successfully'){
          console.log(response);
          this.ErrorMessage=''
         alert(`${response.message}`);
         localStorage.setItem('userInfoFornotes' , JSON.stringify(response.result));
         this._UserService.userData();
         this._Router.navigate(['/home'])
        }
        else{
          this.ErrorMessage=`${response.message}`
        }
      },
      error:(err)=>{
        console.log(err);

      },

    })
  }

}
