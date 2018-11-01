import { Component, OnInit , OnDestroy } from '@angular/core';
import { Video } from '../video/video.model';
import { VideoService } from '../video/video.service'
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, takeWhile, map, toArray } from "rxjs/operators";
import { TransitionGroupComponent, TransitionGroupItemDirective } from './chart-list.transition';
import {  trigger,
  state,
  style,
  animate,
  query,
  stagger,
  animateChild,
  transition } from '@angular/animations';
  
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
    this.interval = 10000;
    this.alive = true;
    

    this.videoService.getAllPeople();
    this.videoService.getAllRankingVideo()
      .subscribe(videos => {

        this.videos = videos
      })

    interval(10000).pipe(
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
  display='none'; 

  

}
