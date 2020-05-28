import { Injectable } from "@angular/core";
import { Post } from "./post.interface";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
const API_URL = "http://localhost:3000";
const POST_PATH = "/api/post";
@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}
  postList: Post[] = [];
  postsChanged = new Subject<Post[]>();

  createPost(newPost: Post) {
    this.http
      .post<{ message: string; postId: string }>(
        `${API_URL}${POST_PATH}`,
        newPost
      )
      .subscribe(({ message, postId }) => {
        const post = { ...newPost, id: postId };
        console.log("message", message);
        console.log("post", post);
        this.postList.push(post);
        this.postsChanged.next(this.postList.slice());
      });
  }

  get getPosts() {
    return [...this.postList];
  }

  getPost(id) {
    const post = { ...this.postList.find((post) => post.id === id) };
    console.log("post", post);
    return post;
  }
  fetchPosts() {
    return this.http
      .get<{ message: string; posts: any }>(`${API_URL}${POST_PATH}`)
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              body: post.body,
              title: post.title,
              id: post._id,
            };
          });
        })
      )
      .subscribe((posts) => {
        console.log("posts", posts);
        this.postList = [...posts];
        this.postsChanged.next(posts);
      });
  }

  deletePost(id: string) {
    return this.http
      .delete<{ id: string }>(`${API_URL}${POST_PATH}/${id}`)
      .subscribe((message) => {
        console.log("message", message);
        const postList = this.postList.filter((post) => id !== post.id);
        this.postsChanged.next(postList);
        this.postList = [...postList];
      });
  }

  updatePost(id: string, post) {
    return this.http
      .put<{ id: string }>(`${API_URL}${POST_PATH}/${id}`, post)
      .subscribe((message) => {
        console.log("message", message);
      });
  }
}
