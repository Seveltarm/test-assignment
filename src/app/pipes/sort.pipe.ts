import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string, secondParameter: string, thirdParameter: string, direction: string): any[] {
    array.sort((a: any, b: any) => {
      if (direction === 'desc') {
        this.checkIsDateFormatProper(a, field, secondParameter);
        if (this.checkSortDirectionBigger(a, b, field, secondParameter, thirdParameter)) {
          return -1;
        } else if (this.checkSortDirectionSmaller(a, b, field, secondParameter, thirdParameter)) {
          return 1;
        } else {
          return 0;
        }
      } else {
        this.checkIsDateFormatProper(a, field, secondParameter);
        if (this.checkSortDirectionSmaller(a, b, field, secondParameter, thirdParameter)) {
          return -1;
        } else if (this.checkSortDirectionBigger(a, b, field, secondParameter, thirdParameter)) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }

  checkIsDateFormatProper(element: any, field: string, secondParameter: string): any {
    if (new Date(element[field][secondParameter]).getTime()) {
      element[field][secondParameter] = new Date(element[field][secondParameter]).getTime();
    }
  }

  checkSortDirectionBigger(a: any, b: any, field: string, secondParameter: string, thirdParameter?: string) {
    if (thirdParameter) {
      return a[field][secondParameter][thirdParameter] > b[field][secondParameter][thirdParameter]
    } else {
      return a[field][secondParameter] > b[field][secondParameter]
    }
  }

  checkSortDirectionSmaller(a: any, b: any, field: string, secondParameter: string, thirdParameter?: string) {
    if (thirdParameter) {
      return a[field][secondParameter][thirdParameter] < b[field][secondParameter][thirdParameter]
    } else {
      return a[field][secondParameter] < b[field][secondParameter]
    }
  }
}