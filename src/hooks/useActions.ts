import { bindActionCreators } from "redux";
import { allActionCreators } from "../store/reducers/action-creators";
import { useAppDispatch } from "./useAppDispatch";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
