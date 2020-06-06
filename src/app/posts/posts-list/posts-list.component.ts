import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.interface";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { distinctUntilChanged } from "rxjs/operators";
@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  totalPost: number = 0;
  pageSize: number = 4;
  postsList: Post[] = [];
  postsSubscription: Subscription;
  constructor(private postService: PostService) {}
  ngOnInit() {
    this.getPosts();
    this.postsSubscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.postsList = posts;
      }
    );
    this.postService.postCount
      .pipe(distinctUntilChanged())
      .subscribe((postCount) => (this.totalPost = postCount));
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
  deletePost(id) {
    console.log("Delete id", id);
    this.postService.deletePost(id);
  }

  getPosts() {
    this.postService.fetchPosts();
  }

  onChangedPage(pageData: PageEvent) {
    const { pageIndex, pageSize } = pageData;
    const currentPage = pageIndex + 1;
    console.log(pageIndex + 1);
    console.log(pageSize);
    this.postService.fetchPosts(pageSize, currentPage);
  }
}
