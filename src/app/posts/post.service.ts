import { Injectable } from "@angular/core";
import { Post } from "./post.interface";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
const API_URL = "http://localhost:3000";
@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}
  postList: Post[] = [];
  postsChanged = new Subject<Post[]>();

  createPost(newPost: Post) {
    console.log("newPost", newPost);
    this.postList.push(newPost);
    this.postsChanged.next(this.postList.slice());
  }

  get getPosts() {
    return [...this.postList];
  }

  fetchPosts() {
    return this.http
      .get<{ message: string; posts: Post[] }>(`${API_URL}/api/post`)
      .subscribe(({ posts, message }) => {
        this.postList = [...posts];
        this.postsChanged.next(posts);
      });
  }
}
