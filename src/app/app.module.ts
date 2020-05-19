import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PostsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
