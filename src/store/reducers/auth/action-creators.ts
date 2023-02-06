import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import {
  AuthActionsEnum,
  SetAuthAction,
  SetErrorAction,
  SetLoadingAction,
  SetUserAction,
} from "./types";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),

  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),

  setIsLoading: (loading: boolean): SetLoadingAction => ({
    type: AuthActionsEnum.SET_LOADING,
    payload: loading,
  }),

  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),

  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));

        setTimeout(async () => {
          const { data } = await UserService.getUsers();
          const mockUser = data.find(
            (f: IUser) => f.password === password && f.username === username
          );

          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);

            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsAuth(true));
          } else {
            dispatch(AuthActionCreators.setError("Login Error"));
          }

          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError("Login Error"));
      }
    },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
