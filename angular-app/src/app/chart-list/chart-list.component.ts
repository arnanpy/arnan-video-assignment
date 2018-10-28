import { Component, OnInit , OnDestroy } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video/video.service'
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, takeWhile, map, toArray } from "rxjs/operators";

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit, OnDestroy { 

  constructor(public videoService: VideoService) { }
  private alive: boolean;
  private interval: number;

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
  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  identify(index, item) {
    return index;
  } 

  videos: Video[];

}
