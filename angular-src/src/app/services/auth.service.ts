import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import  'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  colletion:any;

  constructor(private http:Http) { }

  //registers the user to the backend, and send back the data, which will be either
  //success:true or false.  //.map is used to map to the backend,
  registerUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
        .map(res => res.json());
    }

    registerCollection(collection){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/collections/postcollections', collection,{headers: headers})
          .map(res => res.json());
      }



    //make a post request to authenticateUser
    //we pass the user and header along in the post method.
    authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
        .map(res => res.json());
    }

    //were gettin the profile each time the user stays logged in.
    //We dont need user in the get,because were getting the profile, not sending data
    //but the profile is secured so we need the loadToken function
    getProfile(){
      let headers = new Headers();
      this.loadToken();
      //add an extra header for the id_token varification
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/users/profile',{headers: headers})
        .map(res => res.json());
    }

    getCollections(){
        let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/collections/mycollections',{headers:headers})
        .map(res => res.json());
    }



    storeUserData(token,user){
      //save it in local storage. setItem takes a key and an item.
      localStorage.setItem('id_token',token);
      //for users, we need to stringigy it cause local storage can only store strings not objects
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user;
    }

    loadToken(){
      const token=localStorage.getItem('id_token');
      this.authToken=token;
    }

    //creating logout
    logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }

    loggedIn(){
      return tokenNotExpired('id_token');
    }
}
