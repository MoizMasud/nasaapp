import { Injectable } from '@angular/core';

@Injectable()
export class UserCollectionService {

  constructor() { }
  validateCollection(collection){
    if(collection.name==undefined || collection.discription==undefined){
      return false;
    }else{
      return true;
    }
  }

}
