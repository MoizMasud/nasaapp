import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  //use ngOnInit because we want to load the user, when they inilize
  ngOnInit() {
  this.authService.getProfile().subscribe(profile=>{
    this.user=profile.user;
    console.log(profile.user);
  },
err=>{
  console.log(err);
  return false;
    });
  }

}
