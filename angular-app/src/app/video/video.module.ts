import { ModuleWithProviders, NgModule } from '@angular/core'; 
import { LikeButtonComponent } from '../shared/button/like-button.component';
import { VideoService } from './video.service';

@NgModule({
  imports: [ 
    LikeButtonComponent
  ],
  declarations: [
    LikeButtonComponent
  ],

  providers: [
    LikeButtonComponent,
    VideoService
  ]
})
export class VideoModule {}
