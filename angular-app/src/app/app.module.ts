import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component'; 
import { FavoriteButtonComponent } from './shared/button/favorite-button.component';
import { VideoService } from './video/video.service';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartItemComponent } from './shared/chart-item/chart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    FavoriteButtonComponent,
    ChartItemComponent,
    ChartListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
