import { Component, OnDestroy, OnInit  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import {startWith, switchMap,takeWhile,map,toArray} from "rxjs/operators";
import { Observable,interval } from 'rxjs';     
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})

 
export class AppComponent { 
   
  

  constructor() { 
   
  }
 
 
 
 
}