import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TokenService } from "./services/token.service";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [FooterComponent],
  providers: [TokenService],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class CoreModule {}
