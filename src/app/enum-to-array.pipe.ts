import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object, critEnabled: boolean = true): string[] {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2, keys.length - (critEnabled ? 0 : 1));
  }
}
