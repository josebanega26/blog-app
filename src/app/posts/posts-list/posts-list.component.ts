import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.interface";
import { Subscription } from "rxjs";
Subscription;
@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  postsList: Post[] = [];
  postsSubscription: Subscription;
  constructor(private postService: PostService) {}
  ngOnInit() {
    this.postService.fetchPosts();
    this.postsSubscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.postsList = posts;
      }
    );
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
