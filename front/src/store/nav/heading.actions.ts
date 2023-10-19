import { Action } from "@ngrx/store";


export enum HeadingActionTypes {
  SetHeading = '[Name Component] SetHeading'
}

export class setHeading implements Action {
  readonly type: string = HeadingActionTypes.SetHeading;

  constructor(public payload: string) {
  }
}
