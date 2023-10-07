import { ModalActionTypes } from "./modal.actions";

export interface modalState {
  open: boolean,
  item: string,
  static: boolean
}

export const initialState: modalState = {
  static: false,
  open: false,
  item: ''
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
        item: action.payload.item,
        static: action.payload.static
      } : { ...state }
    default:
      return state
  }
}
