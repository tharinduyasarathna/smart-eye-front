import { Component, OnInit } from "@angular/core";
import { ImageService } from "src/app/services/image.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { ImageData } from "src/app/models/image-data";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  imageData:Observable<ImageData[]>;


  constructor(
    private imageService: ImageService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.imageData = this.imageService.getImages();
  }

  RemoveImage(rowID: string) {
    this.imageService.deleteImage(rowID);
  }
}
