import { Component, OnInit  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { toArray } from 'rxjs/operators';
import { map } from 'rxjs/operators'; 
import {startWith, switchMap} from "rxjs/operators";

import {interval} from "rxjs/internal/observable/interval";
import { Observable } from 'rxjs';
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

 
export class AppComponent implements OnInit { 
   
 
  API = 'http://localhost:3000';
 
  people = {}
  results: Observable<Video[]>;
  videos = {}
  currentuser = {}

  vids: Videoc[];

  uid = 1;

  constructor(private http: HttpClient,private apiService: ApiService) { 
 
  }

  public like_class = 'unlike';
  
 
 
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
    this.getAllVideo(); 
    this.getAllPeople(); 

     
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

  getAllVideo() {
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