import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/store";

// @ts-ignore
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;