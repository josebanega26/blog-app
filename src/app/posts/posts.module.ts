import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostsRoutingModule } from "./posts-routing.module";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { PostsComponent } from "./posts.component";

@NgModule({
  declarations: [PostCreateComponent, PostsListComponent, PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
})
export class PostsModule {}
