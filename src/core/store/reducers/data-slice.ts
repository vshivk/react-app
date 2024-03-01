import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataState, Item} from "../../types/data";
import {RootState} from "../store";

export const initialState: DataState = {
    items: [],
    isLoading: false,
    error: '',
}
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        dataFetching(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        dataFetchingSuccess(state, action: PayloadAction<Item[]>) {
            state.error = '';
            state.items = [...state.items,...action.payload];
            state.isLoading = false;
        },
        dataFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        dataChanging(state, action:PayloadAction<Item[]>) {
            state.items = action.payload;
        }
    }
})

export const selectDataReducers = (state: RootState) => state.dataReducer;
export default dataSlice.reducer;