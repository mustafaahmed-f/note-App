import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './update/add/add.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { UpdateComponent } from './update/update.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonLayoutDisplay, ButtonMaker, ConfirmBoxConfigModule,DialogConfigModule,DialogLayoutDisplay,NgxAwesomePopupModule,ToastNotificationConfigModule} from '@costlydeveloper/ngx-awesome-popup';
import { FooterComponent } from './footer/footer.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        AddComponent,
        NavbarComponent,
        NotFoundComponent,
        NoteDetailsComponent,
        UpdateComponent,
        FooterComponent,
        UpdateUserComponent,


    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScrollingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxAwesomePopupModule.forRoot({
          colorList: {
            success: '#3caea3', // optional
            info: '#2f8ee5', // optional
            warning: '#ffc107', // optional
            danger: '#e46464', // optional
            customOne: '#3ebb1a', // optional
            customTwo: '#bd47fa', // optional (up to custom five)
          },
        }),
        ConfirmBoxConfigModule.forRoot({
          confirmBoxCoreConfig: {
             width: 'auto', // string value with '%' or 'px' as the suffix
             height: 'auto', // string value with '%' or 'px' as the suffix
             buttonPosition: 'right', // check API documentation VerticalPosition
             layoutType: DialogLayoutDisplay.WARNING, // check API documentation DialogLayoutDisplay
             dispatch: {  // Optional default dispatch object.
                title: 'Default title',
                message: 'Default message'
             },
             confirmLabel: 'Confirm', // default confirmation button label
             declineLabel: 'Decline', // default declination button label
             disableIcon: true, // Disable icon by default
             allowHtmlMessage: true, // Allow HTML content in message by default
          },
          // custom buttons overrides the buttons set with confirmLabel & declineLabel
          buttons: [
            new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY), // check API documentation ButtonLayoutDisplay
            new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
         ]
       }),

        DialogConfigModule.forRoot(), // optional
        ToastNotificationConfigModule.forRoot(),
        NgxSpinnerModule,
        CarouselModule

    ]
})
export class AppModule { }
