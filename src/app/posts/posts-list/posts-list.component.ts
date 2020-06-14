import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.interface";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { distinctUntilChanged } from "rxjs/operators";
import { TokenService } from "src/app/core/services/token.service";
@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  totalPost: number = 0;
  pageSize: number = 4;
  postsList: Post[] = [];
  currentPage: number = 1;
  userId: string;
  userAuth;
  postsSubscription: Subscription;
  constructor(
    private postService: PostService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.getPosts();
    this.userId = this.tokenService.getUserId();
    this.postsSubscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.postsList = posts;
      }
    );
    this.userAuth = this.tokenService.getIsAuth();
    this.tokenService.authStatus.subscribe((userIsAuth) => {});
    this.postService.postCount
      .pipe(distinctUntilChanged())
      .subscribe((postCount) => (this.totalPost = postCount));
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
  deletePost(id) {
    this.postService.deletePost(id).subscribe((message) => {
      this.postService.fetchPosts(this.pageSize, this.currentPage);
      this.getPosts();
    });
  }

  getPosts() {
    this.postService.fetchPosts();
  }

  onChangedPage(pageData: PageEvent) {
    const { pageIndex, pageSize } = pageData;
    const currentPage = pageIndex + 1;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.postService.fetchPosts(this.pageSize, this.currentPage);
  }
}
