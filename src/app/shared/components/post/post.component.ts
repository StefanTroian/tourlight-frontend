import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/services/postInterface/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;

  constructor() { }

  ngOnInit(): void {
    this.post.dateCreated = new Date(this.post.dateCreated);
  }

}
