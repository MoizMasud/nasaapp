import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    //linking the html to the component to the service
    //logout is a function in the service,onclicklogout is in the html
    this.authService.logout();
    this.flashMessage.show('You are logged out',
    {cssClass: 'alert-success',
    timeout: 3000});
    this.router.navigate(['/login']);
    return false // to break out of the function
  }

}
