import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postText: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('postText', this.postText)
  }

}
