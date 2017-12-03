import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

import {FlashMessagesService} from 'angular2-flash-messages/';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

//anytime you use a service in a component, u need to inject it as such
constructor(
  private validateservice: ValidateService,
  private flashMessage:FlashMessagesService,
  private authService:AuthService,
  private router: Router
) { }


  ngOnInit() {}

  onRegisterSubmit(){
    const user = {//created user object
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if(!this.validateservice.validateRegister(user)){
      this.flashMessage.show("Please fill in all fields...", {cssClass:'alert-danger',timeout:3000});
      return false;
    }

    if(!this.validateservice.validateEmail(user.email)){
      this.flashMessage.show("Please use a valid email...",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    //Register user
    //we need to bring in the auth service, if the user gets added we display a message
    // Register user
  this.authService.registerUser(user).subscribe(data => {
    if(data.success){
      this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);//redirect the page
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });

  }

}
