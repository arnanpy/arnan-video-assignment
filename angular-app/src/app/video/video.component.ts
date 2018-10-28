import { Component, OnDestroy, OnInit,Input  } from '@angular/core';
import { VideoService } from './video.service'
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, takeWhile, map, toArray } from "rxjs/operators";
import { Videoc } from './video.model';
import { Video } from './video.model';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})

export class VideoComponent  implements OnInit, OnDestroy { 

  constructor(public videoService: VideoService) { }

  public like_class = 'unlike';
  private alive: boolean;

  @Input() video: Video;
 

  ngOnInit() {
    this.interval = 1000;
    this.alive = true;

    this.videoService.getAllPeople();
    this.videoService.getAllRankingVideo()
      .subscribe(videos => {

        this.videos = videos
      })

    interval(100000).pipe(
      takeWhile(() => this.alive))
      .subscribe(() => {
        this.videoService.getAllRankingVideo()
          .subscribe(videos => {
            this.videos = videos
          })
      });
  }

  people = {}
  results: Observable<Video[]>;
  videos = {}
  currentuser = {}

  vids: Videoc[];

  uid = 1;
  private interval: number;

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  identify(index, item) {
    return index;
  }
  onToggleFavorite(status: boolean) {
   // this.video.isliked = status;
    console.log(this.video)

    if (status) {
      this.video.likedpeople++;
    } else {
      this.video.likedpeople--;
    }
  }

}
