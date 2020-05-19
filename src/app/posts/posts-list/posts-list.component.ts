import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit {
  postsList = [1, 2, 3];
  constructor() {}
  ngOnInit() {}
}
