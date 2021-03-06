import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Video } from '../../video/video.model';
import { VideoService } from '../../video/video.service';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html'
})
export class LikeButtonComponent {
  constructor(
    public videoService: VideoService
  ) { }

  @Input() video: Video;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleLike() {
    this.isSubmitting = true;
    if (!this.video.isliked) {
       return this.videoService.updateLike(this.video._id)
        .pipe(tap(
          data => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          err => this.isSubmitting = false
        )).subscribe();

    } else {
        return this.videoService.updateLike(this.video._id)
        .pipe(tap(
          data => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          err => this.isSubmitting = false
        )).subscribe();
    }


  }
}
