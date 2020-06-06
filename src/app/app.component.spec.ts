import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { By } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { of } from "rxjs";

fdescribe("App Component", () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); //Ante de cada prueba creo el componente
    appComponent = fixture.debugElement.componentInstance; // creo una instancia debug
  });

  it("should create the app", () => {
    expect(appComponent).toBeTruthy();
  });

  it("should router outlet be there...", () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBeNull();
  });
});
