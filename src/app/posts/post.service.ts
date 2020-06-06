import { Injectable } from "@angular/core";
import { Post } from "./post.interface";
import { Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { SpinnerService } from "../spinner/spinner.service";

const API_URL = "http://localhost:3000";
const POSTS_PATH = "/api/post";
@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient, private spinner: SpinnerService) {}
  postList: Post[] = [];
  postsChanged = new Subject<Post[]>();
  postChanged = new Subject<Post>();
  postCount = new Subject<number>();
  //POST
  createPost(newPost: Post) {
    const { body, title, image } = newPost;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image, title);
    this.http
      .post<{ message: string; postAdded: Post }>(
        `${API_URL}${POSTS_PATH}`,
        formData
      )
      .subscribe(({ message, postAdded }) => {
        this.postList.push(postAdded);
        this.postsChanged.next(this.postList.slice());
      });
  }

  get getPosts() {
    return [...this.postList];
  }

  getPost(id) {
    this.getPostById(id);
    return this.postChanged;
  }

  getPostById(id) {
    this.spinner.show();
    return this.http
      .get<{ message: string; post: any }>(`${API_URL}${POSTS_PATH}/${id}`)
      .pipe(
        map(({ post }) => {
          return {
            title: post.title,
            body: post.body,
            imagePath: post.imagePath,
            id: post._id,
          };
        })
      )
      .subscribe((post) => {
        console.log("post", post);
        this.spinner.hide();
        this.postChanged.next(post);
      });
  }
  // GET
  fetchPosts(pageSize = 4, currentPage = 1) {
    const params = new HttpParams()
      .set("pageSize", `${pageSize}`)
      .set("currentPage", `${currentPage}`);
    this.spinner.show();
    return this.http
      .get<{ message: string; posts: any; postCount: number }>(
        `${API_URL}${POSTS_PATH}`,
        { params: params }
      )
      .pipe(
        tap(({ postCount }) => {
          this.postCount.next(postCount);
        }),
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              body: post.body,
              imagePath: post.imagePath,
              id: post._id,
            };
          });
        })
      )
      .subscribe((posts) => {
        console.log("posts", posts);
        this.spinner.hide();
        this.postList = [...posts];
        this.postsChanged.next(posts);
      });
  }
  // DELETE
  deletePost(id: string) {
    return this.http.delete<{ id: string }>(`${API_URL}${POSTS_PATH}/${id}`);
  }
  // PUT
  updatePost(id: string, post: Post) {
    const { body, title, image } = post;
    let postData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("title", title);
      postData.append("body", body);
      postData.append("image", image);
    } else {
      postData = {
        body,
        title,
        imagePath: image,
      };
    }
    return this.http
      .put<{ id: string }>(`${API_URL}${POSTS_PATH}/${id}`, postData)
      .subscribe((message) => {
        console.log("message", message);
      });
  }
}
