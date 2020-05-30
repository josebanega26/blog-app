import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const imageType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();

  const fileObservable = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const imageType = new Uint8Array(
          fileReader.result as ArrayBuffer
        ).subarray(0, 4);
        let validType = false;
        let header = "";
        for (let i = 0; i < imageType.length; i++) {
          header += imageType[i].toString(16);
        }
        switch (header) {
          case "89504e47":
            validType = true;
            //type = "image/png";
            break;
          case "47494638":
            validType = true;
            //type = "image/gif";
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            validType = true;
            //type = "image/jpeg";
            break;
          default:
            validType = false;
            //type = "unknown"; // Or you can use the blob.type as fallback
            break;
        }
        if (validType) {
          observer.next(null);
        } else {
          observer.next({ invalidType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return fileObservable;
};
