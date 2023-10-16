import { Directive } from "@angular/core";


@Directive()
export class AbstractListComponent {

  openModal:boolean = false
  getAction(act:any) {
    console.log(act)
  }
}
