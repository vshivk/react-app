import axios from "axios";
import {AppDispatch} from "../store";
import {dataSlice} from "../reducers/data-slice";
import {API_URL} from "../../consts/api";
import {Item} from "../../types/data";
import {nanoid} from "nanoid";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(dataSlice.actions.dataFetching(true));
        const response = await axios.get(API_URL);
        dispatch(dataSlice.actions.dataFetchingSuccess(response.data.results.slice(0, 10).map((item: Item[]) => ({...item, id: nanoid(6)}))));
    } catch (e: any) {
        dispatch(dataSlice.actions.dataFetchingError(e.message));
    }
}