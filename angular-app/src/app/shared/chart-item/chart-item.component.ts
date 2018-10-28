import { Component,Input } from '@angular/core';
import { Video } from 'src/app/video/video.model';

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.css']
})
export class ChartItemComponent {

  constructor() { }

  ngOnInit() {
  }

  @Input() video: Video;
  @Input() index: number;


  onToggleFavorite(favorited: boolean) {
    this.video.isliked = favorited;

    if (favorited) {
      this.video.likedpeople++;
    } else {
      this.video.likedpeople--;
    }
  }

}
