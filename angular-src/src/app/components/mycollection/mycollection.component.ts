import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.css']
})
export class MycollectionComponent implements OnInit {
collection:any;
names:[any];
  constructor(private authService:AuthService) { }

  ngOnInit() {
    var temp=localStorage.getItem('user');
    var temp1=temp.split(":");
    var temp2=temp1[2].slice(1,-2);
    this.authService.getCollections().subscribe(data=>{
      if(data.success){this.collection=data.Collections}
      console.log(this.collection[0].name);
    },
  err=>{
    console.log(err);
    return false;
      });

  }




}
