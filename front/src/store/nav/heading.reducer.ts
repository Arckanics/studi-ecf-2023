import { HeadingActionTypes } from "./heading.actions";


export const initialState = "Accueil"

export const headingReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case HeadingActionTypes.SetHeading:
      return state = action.payload
    default:
      return state
  }
}
