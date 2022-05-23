import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  loading = true;

  @Input() post;

  constructor() { }

  ngOnInit(): void {
    this.post.dateCreated = new Date(this.post.dateCreated);
  }

  getLoaded(event: any) {
    if (event) {
      this.loading = false;
    }
  }

}
