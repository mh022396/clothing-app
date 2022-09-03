import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    //blacklist: ['user'], //list of reducers you don't want to persist
    whitelist: ['cart'] //list of reducers to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//root reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [ thunk , logger]
});

export const persistor = persistStore(store);

