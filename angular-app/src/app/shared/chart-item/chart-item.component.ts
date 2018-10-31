import { Component,Input } from '@angular/core';
import { Video } from 'src/app/video/video.model';
import { VideoService } from 'src/app/video/video.service';
import {  trigger,
  state,
  style,
  animate,
  query,
  transition } from '@angular/animations';
  import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.css'],
  animations: [
  ]
})
export class ChartItemComponent {

  constructor(public videoService: VideoService,private modalService: NgbModal) { }

  ngOnInit() {
  }

  @Input() video: Video;
  @Input() index: number;


  onToggleLike(liked: boolean) {
    this.video.isliked = liked;

    if (liked) {
      this.video.likedpeople++;
    } else {
      this.video.likedpeople--;
    }
  }

  updateView() {
    return this.videoService.updateView( this.video._id ).subscribe();
  }
  closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
