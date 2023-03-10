import { IUser } from "../../../models/IUser";
import { AuthAction, AuthActionsEnum, AuthState } from "./types";

const initialStore: AuthState = {
  isAuth: false,
  error: "",
  isLoading: false,
  user: {} as IUser,
};

export default function authReducer(
  state = initialStore,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };

    case AuthActionsEnum.SET_ERROR:
      return { ...state, error: action.payload };

    case AuthActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case AuthActionsEnum.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
