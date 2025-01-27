import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import carReducer from "./features/cars/carSlice";

// Persist configuration for auth slice
const authPersistConfig = {
	key: "auth",
	storage,
};

// Persist configuration for car slice
const carPersistConfig = {
	key: "car", // Ensure this matches the reducer key
	storage,
};

// Wrapped reducers with persistence
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCarReducer = persistReducer(carPersistConfig, carReducer);

// Combine all reducers
const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: persistedAuthReducer, // Persisted auth slice
	car: persistedCarReducer, // Persisted car slice
});

// Root persist configuration
const rootPersistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "car"], // Persist only auth and car slices
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
});

// Persistor for redux-persist
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
