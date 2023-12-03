import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistedStore = persistStore(store)
