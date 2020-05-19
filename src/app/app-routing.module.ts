import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { LayoutComponent } from "./layout/layout.component";
const routes: Routes = [
  {
    path: "**",
    component: LayoutComponent,
    children: [
      {
        path: "**",
        component: PostsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
