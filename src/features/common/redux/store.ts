import { quickLinksApi } from "@/features/quickLinksPage/ApiSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        [quickLinksApi.reducerPath]: quickLinksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(quickLinksApi.middleware),
});

export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;