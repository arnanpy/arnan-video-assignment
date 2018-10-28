import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http'; 
 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { startWith, switchMap, takeWhile, map, toArray } from "rxjs/operators";
import { Observable, interval } from 'rxjs';
import { Videoc } from './video.model';
import { Video } from './video.model'; 

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class VideoService {

    constructor(public http: HttpClient) {
    }
    API = 'http://localhost:3000'; 
    uid = "1";

    addPerson(name, id) {
        return this.http.post(`${this.API}/users`, { name, id })
    }

    getAllPeople() {
        return this.http.get(`${this.API}/users`)
    }

    identify(index, video) {
        return index;
    }

    getAllRankingVideo() {
   
        return this.http.get<Video[]>(`${this.API}/ranking`,{params: new HttpParams().set("uid",this.uid)})
    }

    updateView(id) {
        return this.http.post(`${this.API}/videos/view`,{ id:id , uid: this.uid })
    }

    updateLike(id) {
        return this.http.post(`${this.API}/videos/like`,{ id: id , uid: this.uid })
    }
    toggle_like(id) {

    }
}
