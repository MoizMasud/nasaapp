import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

//checks if they put in all values into the form
  validateRegister(user){
    if(user.name==undefined || user.email==undefined || user.username==undefined || user.password==undefined){
      return false;
    }else{
      return true;
    }
  }

//validates that its a correct Email
validateEmail(email){
//make sure its in email format
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email); //returns true or false
}

}
