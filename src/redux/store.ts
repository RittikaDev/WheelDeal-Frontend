import { configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import carReducer from "./features/cars/carSlice";

/*
THE persistConfig OBJECT TELLS redux-persist:
WHAT KEY TO USE FOR STORAGE (AUTH).
WHICH STORAGE TO USE (REDUX-PERSIST/LIB/STORAGE USES LOCALSTORAGE).
*/
const persistConfig = {
	key: "auth",
	storage,
};

/*
 * PERSISTREDUCER TAKES YOUR REDUCER (authReducer) AND A persistConfig TO CREATE A WRAPPED REDUCER.
 * THIS WRAPPED REDUCER MANAGES PERSISTENCE FOR THE STATE SLICE (AUTH).
 */
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCarReducer = persistReducer(persistConfig, carReducer);

/*
 redux-persist IS A LIBRARY THAT:
 * SAVES PART (OR ALL) OF YOUR REDUX STATE TO STORAGE (E.G., LOCALSTORAGE).
 * AUTOMATICALLY RELOADS (REHYDRATES) THE STATE WHEN THE APP STARTS.
*/

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		auth: persistedAuthReducer,
		car: persistedCarReducer,
	},
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
