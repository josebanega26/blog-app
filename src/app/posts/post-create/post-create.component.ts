import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { imageType } from "./validator/image-type.validator";
import { Subscription } from "rxjs";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  editMode: boolean = false;
  id: string = null;
  textSize: number = 140;
  imagePreview: string;
  fileName: string = null;

  formSubscription: Subscription;
  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(140),
      ]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [imageType],
      }),
    });

    this.router.params.subscribe((params) => {
      this.id = params["id"];
      this.editMode = this.id ? true : false;
      if (this.editMode) {
        const post = this.postService.getPost(this.id);
        post.subscribe((formValue) => {
          this.setFormValue(formValue);
        });
      }
    });
    this.postForm.valueChanges.subscribe(({ body }) => {
      let bodyLength = body ? (body as string).length : 0;
      if (bodyLength > 0) {
        this.textSize = 140 - bodyLength;
      }
    });
  }
  ngOnDestroy() {}
  setFormValue(post) {
    const { id, imagePath, body, title } = post;
    this.postForm.setValue({ title, body, image: imagePath });
    this.imagePreview = imagePath;
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

  imageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get("image").updateValueAndValidity();
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
