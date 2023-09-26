import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longNumber'
})
export class LongNumberPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): unknown {
    value = typeof value !== "number" ? Number(value) : value
    let strValue = value.toString()
    switch (true) {
      case strValue.length >= 5 && !strValue.match(/\./g):
        return value.toLocaleString('en-US')
      default:
        return value
    }
  }

}
