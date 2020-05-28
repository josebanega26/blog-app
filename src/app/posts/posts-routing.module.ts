import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostsComponent } from "./posts.component";

const routes: Routes = [
  {
    path: "post",
    component: PostsComponent,
    children: [
      {
        path: "",
        component: PostsListComponent,
      },
      {
        path: "create",
        component: PostCreateComponent,
      },
      {
        path: "edit/:id",
        component: PostCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
