import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private authService:AuthService,
    private router:Router
  ){}


  canActivate(){
    //logic for the routes
    if(this.authService.loggedIn()){
      return true;//meaning were logged in, the token not expired. the token only expires if ur logged out
    }else{//we want to redirect
    this.router.navigate(['/login']);
    return false;
  }
  }
}
