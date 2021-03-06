import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import {FlashMessagesService} from 'angular2-flash-messages/module';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;

  constructor(
    private _imageService : ImageService,
    private flashMessage:FlashMessagesService,
  ) { }

  handleSuccess(data){
    try{
    this.imagesFound = true;
    this.images = data.collection.items;

    }
  catch(e){this.flashMessage.show("Please input a valid search", {cssClass:'alert-danger',timeout:3000});}
  }

  handleError(error){
    console.log(error);
  }



  searchImages(query: string){
    this.searching = true;
    return this._imageService.getImage(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  ngOnInit() {
  }

}
