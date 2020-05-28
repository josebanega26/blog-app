import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  editMode: boolean = false;
  id: string = null;
  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });

    this.router.params.subscribe((params) => {
      this.id = params["id"];
      console.log("params", params["id"]);
      this.editMode = this.id ? true : false;
      if (this.editMode) {
        const post = this.postService.getPost(this.id);
        this.setFormValue(post);
      }
    });
  }

  setFormValue(post) {
    const { id, ...formPost } = post;
    this.postForm.setValue(formPost);
  }

  onSubmit() {
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postService.createPost(this.postForm.value);
    }
    this.postForm.reset();
    this.route.navigate(["/post"]);
  }
}
