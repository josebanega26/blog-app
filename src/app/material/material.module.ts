import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  exports: [
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
