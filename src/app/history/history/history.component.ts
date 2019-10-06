import { VideoService } from "./../../services/video/video.service";
import { Component, OnInit } from "@angular/core";
import { ImageService } from "src/app/services/image.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { ImageData } from "src/app/models/image-data";
import { VideoData } from "src/app/models/video-data";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  imageData: Observable<ImageData[]>;
  videoData: Observable<VideoData[]>;

  constructor(
    private imageService: ImageService,
    private videoService: VideoService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.imageData = this.imageService.getImages();
    this.videoData = this.videoService.getVideos();
  }

  RemoveImage(rowID: string) {
    if(confirm("Are you sure to Remove Record ? ")) {
    this.imageService.deleteImage(rowID);}
  }
  RemoveVideo(rowID: string) {
    if(confirm("Are you sure to Remove Record ? ")) {
    this.videoService.deleteVideo(rowID);}
  }
}
