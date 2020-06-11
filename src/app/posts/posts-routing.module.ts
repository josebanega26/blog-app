import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostsComponent } from "./posts.component";
import { AuthGuard } from "../guard/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: PostsComponent,
    children: [
      {
        path: "",
        component: PostsListComponent,
      },
      {
        path: "create",
        component: PostCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit/:id",
        component: PostCreateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class PostsRoutingModule {}
