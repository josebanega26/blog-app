import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.interface";
@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit {
  postsList: Post[] = [];
  constructor(private postService: PostService) {}
  ngOnInit() {
    this.postService.postsChanged.subscribe((posts) => {
      console.log("posts", posts);
      this.postsList = posts;
    });
  }
}
