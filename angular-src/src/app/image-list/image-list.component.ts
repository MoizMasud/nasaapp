import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;

  handleSuccess(data){
    this.imagesFound = true;
    this.images = data.collection.items;
    console.log(data.collection.items);
    console.log(data.collection.items[0].links[0]["href"])
    console.log(data.collection.items[0].data[0]["description"])
  }

  handleError(error){
    console.log(error);
  }

  constructor(private _imageService : ImageService) { }

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
