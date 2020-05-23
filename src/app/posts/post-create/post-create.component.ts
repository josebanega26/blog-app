import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.postService.createPost(this.postForm.value);
    this.postForm.reset();
  }
}
