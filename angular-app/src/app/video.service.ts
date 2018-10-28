import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Video} from "./video";
import {VideoResponse} from "./video-respond.model";

import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {
  }
  API = 'http://localhost:3000';
   
  getAllVideo(): Observable<VideoResponse>  {
    return this.http.get<VideoResponse>(`${this.API}/videos`) 
    .pipe(
        map(res => new VideoResponse().deserialize(res))
      );
  }
 
}