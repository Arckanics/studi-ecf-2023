import { ModalActionTypes } from "./modal.actions";

export interface modalState {
  open: boolean,
  item: string,
  static: boolean,
  extra: any
}

export const initialState: modalState = {
  static: false,
  open: false,
  item: '',
  extra: null
}

export const modalReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ModalActionTypes.ToggleModal:
      return {
        ...state,
        open: action.payload
      }
    case ModalActionTypes.SetModalItem:
      return !state.open ? {
        ...state,
        extra: action.payload.extra,
        item: action.payload.item,
        static: action.payload.static
      } : { ...state }
    default:
      return state
  }
}
