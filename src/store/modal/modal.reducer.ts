import { ModalActionTypes } from "./modal.actions";

export interface modalState {
  open: boolean,
  item: string
}
export const initialState: modalState = {
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
      return {
        ...state,
        item: action.payload
      }
    default:
      return state
  }
}
