import { Action } from "@ngrx/store";


export enum ModalActionTypes {
  ToggleModal = '[Modal Component] ToggleModal',
  SetModalItem = '[Modal Component] SetModalItem'
}

export class ToggleModal implements Action {
  readonly type: string = ModalActionTypes.ToggleModal;

  constructor(public payload: any) {
  }
}

export class SetModalItem implements Action {
  readonly type: string = ModalActionTypes.SetModalItem;

  constructor(public payload: any) {
  }
}
