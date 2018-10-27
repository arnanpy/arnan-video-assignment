import { Component, OnDestroy, OnInit  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {startWith, switchMap,takeWhile,map,toArray} from "rxjs/operators";
import { Observable,interval } from 'rxjs';   
import { Videoc } from './video';
import { Video } from './video';
import {ApiService} from "./video.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})

 
export class AppComponent implements OnInit, OnDestroy { 
   
 
  API = 'http://localhost:3000';
 
  people = {}
  results: Observable<Video[]>;
  videos = {}
  currentuser = {}

  vids: Videoc[];

  uid = 1;
  private interval: number;

  constructor(private http: HttpClient,private apiService: ApiService) { 
    this.interval = 1000;
    this.alive = true;
  }
 
  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  public like_class = 'unlike';
  
  private alive: boolean;
 
 
  ngOnInit() {
  //   interval(5000)
  //   .pipe(
  //     startWith(0),
  //     switchMap(() => this.apiService.getAllVideo())
  //   )
  //   .subscribe(res => {
  //     console.log(res);
  //     this.vids = res.videos;
  //   })
  // ;
  // this.getAllVideo(); 
    this.getAllPeople(); 
    this.http.get(`${this.API}/ranking`)
    .subscribe(videos => {
       
      this.videos = videos 
    })

    interval(1000).pipe(
      takeWhile(() => this.alive))
      .subscribe(() => {
        this.http.get(`${this.API}/ranking`)
          .subscribe(videos => {
             
            this.videos = videos 
          })


        
      });

     
  }
 
  addPerson(name, id) {
    this.http.post(`${this.API}/users`, { name, id })
      .subscribe(() => {
        this.getAllPeople();
      })
  } 

  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .subscribe(people => {
        console.log(people)
        this.people = people 
      })
  }

  identify(index, video){
    return index; 
 }
  getAllVideo() {
    const source = interval(1000);
    this.results = this.http.get<Video[]>(`${this.API}/ranking`) 
  }
 
  updateView(id) {
    this.http.post(`${this.API}/videos/view`, {id })
    .subscribe(() => { 
    })
  }
  updateLike(id) {
    this.http.post(`${this.API}/videos/like`, {id })
    .subscribe(() => {
      this.getAllVideo(); 
    })
  }

  toggle_like(id) {
    if (this.like_class == "unlike") {
      this.like_class = 'like';
    } else {
      this.like_class = 'unlike';
    }
    console.log(id);
    return this.updateLike(id)  
  }
 
 
}
