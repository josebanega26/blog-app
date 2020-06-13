import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("@auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: "post",
        loadChildren: () =>
          import("@posts/posts.module").then((m) => m.PostsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
