import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, legacy_createStore as createStore } from "redux"
import { persistReducer } from "redux-persist"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import rootReducer from './ducks';
import { persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 0,
    debounce: 100,
    stateReconciler: autoMergeLevel2,
    whitelist: [
        'toDos',
        'coins',
        'shopItems',
    ]
}

const rootReducers = combineReducers({ ...rootReducer })
const persistedReducer = persistReducer(persistConfig, rootReducers as any);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;

export { store, persistor };