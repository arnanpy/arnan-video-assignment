import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component'; 
import { LikeButtonComponent } from './shared/button/like-button.component';
import { VideoService } from './video/video.service';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartItemComponent } from './shared/chart-item/chart-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { TransitionGroupComponent,TransitionGroupItemDirective } from './chart-list/chart-list.transition';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    LikeButtonComponent,
    ChartItemComponent,
    ChartListComponent,
    TransitionGroupComponent, TransitionGroupItemDirective
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
