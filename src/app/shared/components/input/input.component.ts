import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Enter Label";
  @Input() placeholder: string = "placeholder";
  @Input() error: boolean = false;
  @Input() type: string = "text";
  @Input() errorMsg: string = "error";
  @Input() disabled: boolean = false;
  value: string;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {}

  ngOnInit() {}

  onInput(event: any) {
    const value = event.target.value;
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  // Funciones obligatorias para que trabaje con NgModel

  writeValue(value: any): void {
    if (value) {
      this.value = value || "";
    } else {
      this.value = "";
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
