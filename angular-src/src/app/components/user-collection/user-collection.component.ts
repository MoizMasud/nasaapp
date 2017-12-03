import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {UserCollectionService } from '../../services/user-collection.service';
import {AuthService} from '../../services/auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {
  collection:Object;
  name:String;
  images:any[];
  isPrivate:String;
  discription:String;

  constructor(
  private userCollectionService: UserCollectionService,
  private authService:AuthService,
  private flashMessage:FlashMessagesService,
  private router: Router) { }

  ngOnInit() {
    this.isPrivate="true";
  }



  onCollectionSubmit(){
    if(this.isPrivate == "true"){
      var isPrivatebool=true;
    }
    else{
      var isPrivatebool=false;
    }
var temp=localStorage.getItem('user');
var temp1=temp.split(":");
var temp2=temp1[2].slice(1,-2)
    const collection = {//created user object
      createdBy:temp2,
      name: this.name,
      isPrivate: isPrivatebool,
      discription:this.discription
    }


    if(!this.userCollectionService.validateCollection(collection)){
      this.flashMessage.show("Please fill in all fields...", {cssClass:'alert-danger',timeout:3000});
      return false;
    }

    this.authService.registerCollection(collection).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You collection has been added', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/dashboard']);//redirect the page
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/usercollection']);
      }
    });

  }
}
