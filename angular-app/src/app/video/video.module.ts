import { ModuleWithProviders, NgModule } from '@angular/core'; 
import { FavoriteButtonComponent } from '../shared/button/favorite-button.component';
import { VideoService } from './video.service';

@NgModule({
  imports: [ 
    FavoriteButtonComponent
  ],
  declarations: [
    FavoriteButtonComponent
  ],

  providers: [
    FavoriteButtonComponent,
    VideoService
  ]
})
export class VideoModule {}
