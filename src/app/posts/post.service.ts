import { Injectable } from "@angular/core";
import { Post } from "./post.interface";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor() {}
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
}
