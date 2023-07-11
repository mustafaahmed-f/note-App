import { UpdateUserComponent } from './update-user/update-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { checkloginGuard } from './checklogin.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './update/add/add.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' , component:HomeComponent , title:'Home' ,canActivate:[checkloginGuard]},
  {path:'logIn' , component:LoginComponent , title:'login'},
  {path:'signUp' , component:SignupComponent , title:'sign up' },
  {path:'add' , component:AddComponent , title:'add note' , canActivate:[checkloginGuard]},
  {path:'update/:id' ,component:UpdateComponent , title:'update note' ,canActivate:[checkloginGuard] },
  {path:'details/:id' , component:NoteDetailsComponent , title:'Note Details' ,canActivate:[checkloginGuard]},
  {path:'updateUser' , component:UpdateUserComponent , title :'Update user' , canActivate:[checkloginGuard] },
  {path:'**' , component:NotFoundComponent , title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
