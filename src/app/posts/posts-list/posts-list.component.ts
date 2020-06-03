import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.interface";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
PageEvent;
@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  totalPost: number = 50;
  postsPerPage: number = 5;
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
  deletePost(id) {
    console.log("Delete id", id);
    this.postService.deletePost(id);
  }

  onChangedPage(pageData: PageEvent) {
    console.log("pageData", pageData);
  }
}
